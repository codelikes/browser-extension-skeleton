export class QuickAction {
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;

    console.log('QuickAction:toggle', this.isOpen);
  }
}
