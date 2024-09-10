import readline from 'readline/promises'

export class OperacionesConsola {
  private static instance: OperacionesConsola //patron singleton

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new OperacionesConsola()
    }
    return this.instance
  }

  async read(): Promise<string[]> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    const answer = await rl.question(">: ")
    rl.close()
    return answer.split(' ')
  }

  async write(message: string): Promise<void> {
    message.split('\n').forEach(line => console.log(line))
  }
}