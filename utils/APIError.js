
class APIError {
  constructor( message="success", statusCode,data) {
    this.data = data,
    this.message = message;
    this.success = statusCode<400,
    this.statusCode=statusCode
  }
}

export default APIError ;
