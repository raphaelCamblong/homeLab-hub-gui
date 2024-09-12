import IBackend from "./IBackend";
import BackendService from "./BackendService";
import BackendMock from "./BackendMock";

// Backend Singleton with interface
class Backend {
  private static instance: IBackend;

  constructor() {}

  public static getInstance(): IBackend {
    if (Backend.instance) {
      return Backend.instance;
    }
    if (process.env.NEXT_PUBLIC_ENV == "dev") {
      Backend.instance = new BackendService(
        process.env.NEXT_PUBLIC_ENV_BO_API_URL ?? "",
      );
    } else {
      Backend.instance = new BackendMock("/mocks");
    }
    return Backend.instance;
  }
}

export default Backend;
