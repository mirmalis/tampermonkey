function SDPAltert(){
  setInterval(() => alert(123), 5000);
}
function SDPInject(){
  function InjectJsonHook(modify, handle){
    Response.prototype.MyJson = Response.prototype.json;
    Response.prototype.json = async function () {
      let json = await this.MyJson();
      let modifiedJson = modify(this, json);
      handle(this, modifiedJson);
      return modifiedJson;
    };
  }
  alert('SDPInjecting');
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
