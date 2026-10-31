// Browser Text-to-Speech supporting French & Arabic for kids

class SpeechNarrator {
  private isAvailable: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private speaking: boolean = false;
  private listeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isAvailable = true;
    }
  }

  public subscribe(cb: (speaking: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify(speaking: boolean) {
    this.speaking = speaking;
    this.listeners.forEach((cb) => cb(speaking));
  }

  public speak(text: string) {
    if (!this.isAvailable) return;
    this.stop();

    // Detect if Arabic letters are present
    const isArabic = /[\u0600-\u06FF]/.test(text);

    // Clean text
    const cleanText = text
      .replace(/[#*_`]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isArabic ? 'ar-SA' : 'fr-FR';

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      if (isArabic) {
        const arVoice = voices.find((v) => v.lang.startsWith('ar'));
        if (arVoice) utterance.voice = arVoice;
      } else {
        const frVoice = voices.find(
          (v) =>
            v.lang.startsWith('fr') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Thomas') ||
              v.name.includes('Audrey'))
        ) || voices.find((v) => v.lang.startsWith('fr'));
        if (frVoice) utterance.voice = frVoice;
      }
    }

    utterance.rate = 0.95; // Gentle pace for kids
    utterance.pitch = 1.05;

    utterance.onstart = () => this.notify(true);
    utterance.onend = () => this.notify(false);
    utterance.onerror = () => this.notify(false);

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notify(false);
    }
  }

  public isSpeaking(): boolean {
    return this.speaking;
  }
}

export const speech = new SpeechNarrator();
