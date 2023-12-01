function SDPInject(){
  alert('SDPInjecting');
  function InjectJsonHook(modify, handle){
    Response.prototype.MyJson = Response.prototype.json;
    Response.prototype.json = async function () {
      let json = await this.MyJson();
      let modifiedJson = modify(this, json);
      handle(this, modifiedJson);
      return modifiedJson;
    };
  }
  InjectJsonHook(
    async (Response, Data) => Data,
    async (Response, Data) => {
      if (!Data) {
        return;
      }
      
      let asd = {
        "Data": Data,
        "To": Response.url,
        "From": document.location.href,
        Response
      };
      console.log(asd);
    }
  );
}
