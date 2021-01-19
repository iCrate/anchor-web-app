import { createMuiTheme } from '@material-ui/core/styles';
import type { DefaultTheme } from 'styled-components';
import { muiThemeBase } from './muiThemeBase';

export const lightTheme: DefaultTheme = {
  ...createMuiTheme({
    ...muiThemeBase,

    palette: {
      type: 'light',
    },
  }),

  intensity: 0.1,

  backgroundColor: '#f4f4f5',
  textColor: '#1f1f1f',
  dimTextColor: '#8a8a8a',
  errorTextColor: '#ef3158',

  actionButton: {
    backgroundColor: '#94f3b8',
    backgroundHoverColor: '#84eaac',
    textColor: '#2c2c2e',
  },

  selector: {
    backgroundColor: '#f4f4f5',
    textColor: '#2c2c2e',
  },

  formControl: {
    labelColor: '#8a8a8a',
    labelFocusedColor: '#3867c4',
    labelErrorColor: '#ef3158',
  },

  textInput: {
    backgroundColor: '#efefef',
    textColor: '#2c2c2e',
  },

  table: {
    head: {
      textColor: '#8a8a8a',
    },
    body: {
      textColor: '#2c2c2e',
    },
  },

  slider: {
    thumb: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      thumbColor: '#ffffff',
    },
  },
  
  skeleton: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    lightColor: 'rgba(255, 255, 255, 0.8)'
  },

  dialog: {
    normal: {
      backgroundColor: '#f4f4f5',
      textColor: '#1f1f1f',
    },
    warning: {
      backgroundColor: '#f4f4f5',
      textColor: '#dd8f5c',
    },
    error: {
      backgroundColor: '#f4f4f5',
      textColor: '#ef3158',
    },
    success: {
      backgroundColor: '#f4f4f5',
      textColor: '#3e9bba',
    },
  },

  tooltip: {
    normal: {
      backgroundColor: '#94f3b8',
      textColor: '#1f1f1f',
    },
    warning: {
      backgroundColor: '#dd8f5c',
      textColor: '#ffffff',
    },
    error: {
      backgroundColor: '#ef3158',
      textColor: '#ffffff',
    },
    success: {
      backgroundColor: '#3e9bba',
      textColor: '#ffffff',
    },
  },
  
  snackbar: {
    normal: {
      backgroundColor: '#94f3b8',
      textColor: '#1f1f1f',
    },
    warning: {
      backgroundColor: '#dd8f5c',
      textColor: '#1f1f1f',
    },
    error: {
      backgroundColor: '#ef3158',
      textColor: '#ffffff',
    },
    success: {
      backgroundColor: '#3e9bba',
      textColor: '#ffffff',
    },
  },
};