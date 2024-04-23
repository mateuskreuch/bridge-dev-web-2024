class ErrorColorMap {
  static ERROR_COLOR_MAP: {[key: string]: string} = {
    '--g-color-accent--2': 'var( --g-color-error--2 )',
    '--g-color-accent--1': 'var( --g-color-error--1 )',
    '--g-color-accent-0':  'var( --g-color-error-0 )',
    '--g-color-accent-1':  'var( --g-color-error-1 )',
    '--g-color-accent-2':  'var( --g-color-error-2 )',
  };

  static apply() {
    for (const color in ErrorColorMap.ERROR_COLOR_MAP) {
      document.documentElement.style.setProperty(
        color,
        ErrorColorMap.ERROR_COLOR_MAP[color]
      );
    }
  }

  static remove() {
    for (const color in ErrorColorMap.ERROR_COLOR_MAP) {
      document.documentElement.style.removeProperty(color);
    }
  }
}

//----------------------------------------------------------------------------//

export default ErrorColorMap;