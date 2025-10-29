"""
Procedural 3D model generation for rockets, cars, and planes
No API needed - generates GLB files programmatically
"""
import struct
import json
import math

def create_rocket_glb(stages=2, fins=4, color='red', height=10):
    """Generate a procedural rocket model"""
    vertices = []
    indices = []
    
    # Body (cylinder)
    segments = 16
    radius = 0.5
    
    for i in range(segments + 1):
        angle = (i / segments) * 2 * math.pi
        x = radius * math.cos(angle)
        z = radius * math.sin(angle)
        
        # Bottom
        vertices.extend([x, 0, z])
        # Top
        vertices.extend([x, height, z])
    
    # Cone nose
    vertices.extend([0, height + 2, 0])  # Tip
    
    # Fins
    fin_height = height * 0.3
    fin_width = 1.5
    for i in range(fins):
        angle = (i / fins) * 2 * math.pi
        x = radius * math.cos(angle)
        z = radius * math.sin(angle)
        
        # Fin vertices
        vertices.extend([x, 0, z])
        vertices.extend([x + fin_width * math.cos(angle), 0, z + fin_width * math.sin(angle)])
        vertices.extend([x, fin_height, z])
    
    # Generate indices (simplified)
    for i in range(len(vertices) // 3 - 2):
        indices.extend([0, i + 1, i + 2])
    
    return create_glb_from_vertices(vertices, indices)


def create_car_glb(style='sports', color='blue', spoiler=True):
    """Generate a procedural car model"""
    vertices = []
    
    # Body (box)
    w, h, l = 2, 1, 4  # width, height, length
    
    # Bottom vertices
    vertices.extend([-w/2, 0, -l/2])
    vertices.extend([w/2, 0, -l/2])
    vertices.extend([w/2, 0, l/2])
    vertices.extend([-w/2, 0, l/2])
    
    # Top vertices
    vertices.extend([-w/2, h, -l/2])
    vertices.extend([w/2, h, -l/2])
    vertices.extend([w/2, h, l/2])
    vertices.extend([-w/2, h, l/2])
    
    # Cabin (smaller box on top)
    cw, ch, cl = 1.5, 0.8, 2
    vertices.extend([-cw/2, h, -cl/2])
    vertices.extend([cw/2, h, -cl/2])
    vertices.extend([cw/2, h + ch, -cl/2])
    vertices.extend([-cw/2, h + ch, -cl/2])
    
    # Wheels (simplified as cylinders)
    wheel_positions = [
        [-w/2 - 0.2, 0.3, -l/2 + 0.5],
        [w/2 + 0.2, 0.3, -l/2 + 0.5],
        [-w/2 - 0.2, 0.3, l/2 - 0.5],
        [w/2 + 0.2, 0.3, l/2 - 0.5],
    ]
    
    for pos in wheel_positions:
        vertices.extend(pos)
    
    # Spoiler
    if spoiler:
        vertices.extend([-w/2, h + 0.5, l/2])
        vertices.extend([w/2, h + 0.5, l/2])
        vertices.extend([w/2, h + 0.8, l/2 + 0.3])
        vertices.extend([-w/2, h + 0.8, l/2 + 0.3])
    
    indices = []
    for i in range(len(vertices) // 3 - 2):
        indices.extend([0, i + 1, i + 2])
    
    return create_glb_from_vertices(vertices, indices)


def create_plane_glb(wingspan=10, style='fighter', engines=2):
    """Generate a procedural plane model"""
    vertices = []
    
    # Fuselage (elongated body)
    length = 8
    radius = 0.5
    segments = 12
    
    for i in range(segments + 1):
        angle = (i / segments) * 2 * math.pi
        x = radius * math.cos(angle)
        z = radius * math.sin(angle)
        
        vertices.extend([x, 0, 0])
        vertices.extend([x, 0, length])
    
    # Wings
    wing_y = 0.5
    wing_thickness = 0.2
    
    # Main wings
    vertices.extend([-wingspan/2, wing_y, length/2])
    vertices.extend([wingspan/2, wing_y, length/2])
    vertices.extend([wingspan/2, wing_y + wing_thickness, length/2])
    vertices.extend([-wingspan/2, wing_y + wing_thickness, length/2])
    
    # Tail wings
    tail_span = wingspan * 0.4
    vertices.extend([-tail_span/2, wing_y, length - 1])
    vertices.extend([tail_span/2, wing_y, length - 1])
    
    # Vertical stabilizer
    vertices.extend([0, wing_y, length - 1])
    vertices.extend([0, wing_y + 2, length - 1])
    
    # Engines
    for i in range(engines):
        offset = (i - engines/2 + 0.5) * 2
        vertices.extend([offset, wing_y - 0.5, length/2])
        vertices.extend([offset, wing_y - 0.5, length/2 + 1])
    
    indices = []
    for i in range(len(vertices) // 3 - 2):
        indices.extend([0, i + 1, i + 2])
    
    return create_glb_from_vertices(vertices, indices)


def create_glb_from_vertices(vertices, indices):
    """Convert vertices and indices to GLB binary format"""
    # Pack binary data
    vertex_data = struct.pack(f'{len(vertices)}f', *vertices)
    index_data = struct.pack(f'{len(indices)}H', *indices)
    
    # Calculate bounds
    vertex_count = len(vertices) // 3
    max_vals = [max(vertices[i::3]) for i in range(3)]
    min_vals = [min(vertices[i::3]) for i in range(3)]
    
    # Create glTF JSON
    gltf = {
        "asset": {"version": "2.0", "generator": "ProceduralGenerator"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [{
            "primitives": [{
                "attributes": {"POSITION": 0},
                "indices": 1,
                "material": 0
            }]
        }],
        "materials": [{
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.8, 0.2, 0.2, 1.0],
                "metallicFactor": 0.5,
                "roughnessFactor": 0.5
            }
        }],
        "buffers": [{"byteLength": len(vertex_data) + len(index_data)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": 0, "byteLength": len(vertex_data), "target": 34962},
            {"buffer": 0, "byteOffset": len(vertex_data), "byteLength": len(index_data), "target": 34963}
        ],
        "accessors": [
            {
                "bufferView": 0,
                "componentType": 5126,
                "count": vertex_count,
                "type": "VEC3",
                "max": max_vals,
                "min": min_vals
            },
            {
                "bufferView": 1,
                "componentType": 5123,
                "count": len(indices),
                "type": "SCALAR"
            }
        ]
    }
    
    # Create GLB
    json_data = json.dumps(gltf).encode('utf-8')
    json_padding = (4 - len(json_data) % 4) % 4
    json_data += b' ' * json_padding
    
    bin_data = vertex_data + index_data
    bin_padding = (4 - len(bin_data) % 4) % 4
    bin_data += b'\x00' * bin_padding
    
    # GLB header
    glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(json_data) + 8 + len(bin_data))
    # JSON chunk
    glb += struct.pack('<II', len(json_data), 0x4E4F534A) + json_data
    # Binary chunk
    glb += struct.pack('<II', len(bin_data), 0x004E4942) + bin_data
    
    return glb
