import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        loginPatient: resolve(__dirname, 'login-patient.html'),
        loginDoctor: resolve(__dirname, 'login-doctor.html'),
        loginAdmin: resolve(__dirname, 'login-admin.html'),
        register: resolve(__dirname, 'register.html'),
        patientDashboard: resolve(__dirname, 'patient-dashboard.html'),
        doctorDashboard: resolve(__dirname, 'doctor-dashboard.html'),
        adminDashboard: resolve(__dirname, 'admin-dashboard.html'),
        appointments: resolve(__dirname, 'appointments.html'),
      },
    },
  },
});
