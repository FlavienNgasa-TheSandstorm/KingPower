// src/services/notificationService.js
import api from '../lib/api';
import toast from 'react-hot-toast';

class NotificationService {
  constructor() {
    this.notifications = [];
    this.listeners = [];
    this.unreadCount = 0;
    this.checkInterval = null;
  }

  // Ajouter un listener pour les mises à jour
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notifier tous les listeners
  notify() {
    this.listeners.forEach(listener => listener(this.notifications, this.unreadCount));
  }

  // Démarrer la surveillance des notifications
  startPolling() {
    this.fetchNotifications();
    this.checkInterval = setInterval(() => this.fetchNotifications(), 30000); // 30 secondes
  }

  // Arrêter la surveillance
  stopPolling() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  // Récupérer les notifications depuis le backend
  async fetchNotifications() {
    try {
      const response = await api.get('/admin/notifications');
      this.notifications = response.data;
      this.unreadCount = this.notifications.filter(n => !n.read).length;
      this.notify();
    } catch (error) {
      console.error('Erreur chargement notifications:', error);
    }
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId) {
    try {
      await api.put(`/admin/notifications/${notificationId}/read`);
      await this.fetchNotifications();
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  // Marquer tout comme lu
  async markAllAsRead() {
    try {
      await api.put('/admin/notifications/read-all');
      await this.fetchNotifications();
      toast.success('Toutes les notifications ont été marquées comme lues');
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
}

export default new NotificationService();