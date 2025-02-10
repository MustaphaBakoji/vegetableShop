class Express {
  constructor(session, local) {
    this.session = session;
    this.local = local;
  }
  Router = (a = this.session, b = this.local) => {
    console.log("Working");
    return a, b;
  }
}
