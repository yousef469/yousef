/**
 * Virtual Classroom Service
 * Handles 3D model synchronization using Supabase Realtime
 * Modern replacement for WebRTC-based screen sharing
 */

import { supabase } from './supabase';

class ClassroomService {
  constructor() {
    this.channel = null;
    this.roomId = null;
    this.isTeacher = false;
    this.listeners = new Map();
  }

  /**
   * Join a classroom session
   * @param {string} roomId - Unique room identifier
   * @param {boolean} isTeacher - Whether user is the teacher
   * @param {object} callbacks - Event callbacks
   */
  async joinRoom(roomId, isTeacher, callbacks = {}) {
    this.roomId = roomId;
    this.isTeacher = isTeacher;

    // Create or join channel
    this.channel = supabase.channel(`classroom-${roomId}`, {
      config: {
        broadcast: { self: false }, // Don't receive own messages
        presence: { key: '' }
      }
    });

    // Listen for camera movements
    this.channel.on('broadcast', { event: 'camera-move' }, (payload) => {
      if (callbacks.onCameraMove && !this.isTeacher) {
        callbacks.onCameraMove(payload.payload);
      }
    });

    // Listen for model changes
    this.channel.on('broadcast', { event: 'model-change' }, (payload) => {
      if (callbacks.onModelChange) {
        callbacks.onModelChange(payload.payload);
      }
    });

    // Listen for annotation events
    this.channel.on('broadcast', { event: 'annotation' }, (payload) => {
      if (callbacks.onAnnotation) {
        callbacks.onAnnotation(payload.payload);
      }
    });

    // Listen for pointer events (laser pointer)
    this.channel.on('broadcast', { event: 'pointer' }, (payload) => {
      if (callbacks.onPointer) {
        callbacks.onPointer(payload.payload);
      }
    });

    // Track presence (who's in the room)
    this.channel.on('presence', { event: 'sync' }, () => {
      const state = this.channel.presenceState();
      if (callbacks.onPresenceChange) {
        callbacks.onPresenceChange(state);
      }
    });

    // Subscribe to channel
    await this.channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        // Track presence
        await this.channel.track({
          user_id: callbacks.userId,
          user_name: callbacks.userName,
          is_teacher: this.isTeacher,
          joined_at: new Date().toISOString()
        });

        if (callbacks.onConnected) {
          callbacks.onConnected();
        }
      }
    });

    return this.channel;
  }

  /**
   * Broadcast camera position (teacher only)
   */
  broadcastCameraMove(cameraData) {
    if (!this.isTeacher || !this.channel) return;

    this.channel.send({
      type: 'broadcast',
      event: 'camera-move',
      payload: {
        position: {
          x: cameraData.position.x,
          y: cameraData.position.y,
          z: cameraData.position.z
        },
        target: {
          x: cameraData.target.x,
          y: cameraData.target.y,
          z: cameraData.target.z
        },
        zoom: cameraData.zoom,
        timestamp: Date.now()
      }
    });
  }

  /**
   * Broadcast model change (teacher only)
   */
  async broadcastModelChange(modelUrl, modelName) {
    if (!this.isTeacher || !this.channel) return;

    this.channel.send({
      type: 'broadcast',
      event: 'model-change',
      payload: {
        url: modelUrl,
        name: modelName,
        timestamp: Date.now()
      }
    });
  }

  /**
   * Broadcast annotation/drawing
   */
  broadcastAnnotation(annotationData) {
    if (!this.isTeacher || !this.channel) return;

    this.channel.send({
      type: 'broadcast',
      event: 'annotation',
      payload: annotationData
    });
  }

  /**
   * Broadcast laser pointer position
   */
  broadcastPointer(pointerData) {
    if (!this.isTeacher || !this.channel) return;

    this.channel.send({
      type: 'broadcast',
      event: 'pointer',
      payload: {
        x: pointerData.x,
        y: pointerData.y,
        z: pointerData.z,
        visible: pointerData.visible
      }
    });
  }

  /**
   * Upload model to Supabase Storage
   */
  async uploadModel(file) {
    if (!this.isTeacher) {
      throw new Error('Only teachers can upload models');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${this.roomId}-${Date.now()}.${fileExt}`;
    const filePath = `classroom-models/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('models')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('models')
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      name: file.name,
      path: filePath
    };
  }

  /**
   * Get list of participants
   */
  getParticipants() {
    if (!this.channel) return [];

    const state = this.channel.presenceState();
    const participants = [];

    Object.keys(state).forEach(key => {
      state[key].forEach(presence => {
        participants.push(presence);
      });
    });

    return participants;
  }

  /**
   * Leave the classroom
   */
  async leaveRoom() {
    if (this.channel) {
      await this.channel.untrack();
      await supabase.removeChannel(this.channel);
      this.channel = null;
    }
    this.roomId = null;
    this.isTeacher = false;
  }

  /**
   * Check if user is connected
   */
  isConnected() {
    return this.channel !== null;
  }
}

// Export singleton instance
export default new ClassroomService();
