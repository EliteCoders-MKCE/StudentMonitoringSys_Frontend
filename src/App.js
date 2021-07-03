function App() {
  let user = {
    name:"saran",
    mark:95,
    registerno:"19BME4109"
  }
  return (
    <div>
   <h1>Hello World</h1>
   <div>
     User Name is {user.name}<br/>
     Register Number is {user.registerno}
     <br/>
     Marks scored : {user.mark}
     <br/>
     <input type="text"/>
   </div>
   </div>
  );
}

export default App;
