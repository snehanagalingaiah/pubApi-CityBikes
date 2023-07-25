let url="https://api.citybik.es/v2/networks";
let tableBikeData=document.getElementById("tableBikeData");
let i=1;
tableBikeData.innerHTML="";

const getBikeData= async ()=>{
    let bikeData=await fetch(url);
    let bikeDataJson= await bikeData.json();
    return bikeDataJson;
}

const buildTable = (bike, i) => {
    tableBikeData.innerHTML +=`
    <tr>
    <td>${i+1}</td>
    <td id='dynamicCompany${i+1}'>    
    </td>
    <td>${bike.name}</td>
    <td>${bike.location.city}</td>
    <td>${bike.location.country}</td>
    <td>${bike.href}</td>
    </tr>`
    let listItems = bike.company ? Array.isArray(bike.company) ? bike.company.map((company)=>{
      return '<div>' + company + '</div>';
    }) :  '<div>' + bike.company + '</div>' : '<div>NA</div>';
    if(Array.isArray(listItems) && listItems.length > 1){
      listItems=listItems.join(" ")
    }
  document.getElementById(`dynamicCompany${i+1}`).innerHTML = listItems;
 }

let bikeData= getBikeData().then((bikeData)=>{
  return (bikeData.networks);
 
}).then((bikes)=>{bikes.forEach((bike, i)=>{
    buildTable(bike, i);
})}).catch(err => windows.alert("Unable to fetch data"))



