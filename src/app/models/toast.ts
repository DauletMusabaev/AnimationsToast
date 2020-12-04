
export interface Toast {
    title: string;
    type: string;
    content: string;
    duration: number;
    close: boolean;
    time: boolean;
    showtitle: boolean;
  
  }
  export interface location extends Toast {
    index: number;
    x: string;
    y: string;
  
  }