from flask import Flask, request, Response
from flask_cors import CORS
import edge_tts
import asyncio
import io

app = Flask(__name__)
CORS(app)

# Available voices (Microsoft Neural voices - very human-like)
VOICES = {
    'jenny': 'en-US-JennyNeural',      # US Female - friendly
    'guy': 'en-US-GuyNeural',          # US Male - professional
    'aria': 'en-US-AriaNeural',        # US Female - natural
    'davis': 'en-US-DavisNeural',      # US Male - casual
    'sonia': 'en-GB-SoniaNeural',      # UK Female
    'ryan': 'en-GB-RyanNeural',        # UK Male
    'natasha': 'en-AU-NatashaNeural',  # AU Female
    'william': 'en-AU-WilliamNeural',  # AU Male
}

async def generate_speech(text, voice):
    """Generate speech using Edge TTS"""
    communicate = edge_tts.Communicate(text, voice)
    audio_data = io.BytesIO()
    
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.write(chunk["data"])
    
    audio_data.seek(0)
    return audio_data.read()

@app.route('/')
def health():
    return {'status': 'ok', 'service': 'Edge TTS Server', 'voices': list(VOICES.keys())}

@app.route('/api/tts', methods=['POST'])
def tts():
    try:
        data = request.get_json()
        text = data.get('text', '')
        voice_key = data.get('voice', 'jenny').lower()
        
        if not text:
            return {'error': 'Missing text'}, 400
        
        # Get voice name
        voice = VOICES.get(voice_key, VOICES['jenny'])
        
        # Limit text length
        text = text[:5000]
        
        print(f"🎤 TTS: {len(text)} chars, voice: {voice}")
        
        # Generate audio
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        audio_data = loop.run_until_complete(generate_speech(text, voice))
        loop.close()
        
        return Response(audio_data, mimetype='audio/mpeg')
    
    except Exception as e:
        print(f"❌ TTS Error: {e}")
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
