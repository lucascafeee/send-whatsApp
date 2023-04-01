class ChatSender {
  constructor(scriptText) {
    this.lines = this.parseScriptText(scriptText);
    this.main = document.querySelector("#main");
    this.textarea = this.getTextarea();
  }

  parseScriptText(scriptText) {
    return scriptText
      .split(/[\n\t]+/)
      .map((line) => line.trim())
      .filter((line) => line);
  }

  getTextarea() {
    const textarea = this.main.querySelector(`div[contenteditable="true"]`);
    if (!textarea) {
      throw new Error("Não há uma conversa aberta");
    }
    return textarea;
  }

  async sendLine(line) {
    console.log(line);

    this.textarea.focus();
    document.execCommand("insertText", false, line);
    this.textarea.dispatchEvent(new Event("change", { bubbles: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        (
          this.main.querySelector(`[data-testid="send"]`) ||
          this.main.querySelector(`[data-icon="send"]`)
        ).click();
        resolve();
      }, 100);
    });
  }

  async sendAllLines() {
    for (let i = 0; i < this.lines.length; i++) {
      await this.sendLine(this.lines[i]);

      if (i !== this.lines.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }

    return this.lines.length;
  }
}

(async () => {
  try {
    // texto aqui! 
    const scriptText = ``;

    const chatSender = new ChatSender(scriptText);
    const numberOfMessages = await chatSender.sendAllLines();
    console.log(`Código finalizado, ${numberOfMessages} mensagens enviadas`);
  } catch (error) {
    console.error(error);
  }
})();
