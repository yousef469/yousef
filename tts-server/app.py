from flask import Flask, request, Response
from flask_cors import CORS
import edge_tts
import asyncio
import io

app = Flask(__name__)
CORS(app)

# Available voices
VOICES = {
    'jenny': 'en-US-JennyNeural',
    'guy': 'en-US-GuyNeural',
    'aria': 'en-US-AriaNeural',
    'davis': 'en-US-DavisNeural',
    'sonia': 'en-GB-SoniaNeural',
    'ryan': 'en-GB-RyanNeural',
    'natasha': 'en-AU-NatashaNeural',
    'william': 'en-AU-WilliamNeural',
}

def generate_speech_sync(text, voice):
    """Generate speech using Edge TTS (sync wrapper)"""
    async def _generate():
        communicate = edge_tts.Communicate(text, voice)
        audio_data = b""
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_data += chunk["data"]
        return audio_data
    
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(_generate())
        loop.close()
        return result
    except Exception as e:
        print(f"Error in generate_speech: {e}")
        raise

@app.route('/')
def health():
    return {'status': 'ok', 'service': 'Edge TTS Server', 'voices': list(VOICES.keys())}

@app.route('/api/tts', methods=['POST', 'OPTIONS'])
def tts():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json() or {}
        text = data.get('text', '')
        voice_key = data.get('voice', 'jenny').lower()
        
        if not text:
            return {'error': 'Missing text'}, 400
        
        voice = VOICES.get(voice_key, VOICES['jenny'])
        text = text[:3000]  # Limit text
        
        print(f"🎤 TTS: {len(text)} chars, voice: {voice}")
        
        audio_data = generate_speech_sync(text, voice)
        
        if not audio_data:
            return {'error': 'No audio generated'}, 500
        
        print(f"✅ Generated {len(audio_data)} bytes")
        return Response(audio_data, mimetype='audio/mpeg')
    
    except Exception as e:
        print(f"❌ TTS Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
