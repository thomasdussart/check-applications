// fetch categories
let boutonCategorie = document.getElementById("category");

boutonCategorie.addEventListener("click", () => {
  let categorie = document.getElementById("categories").value;

  const data = {
    categorie: categorie,
  };
  fetch("http://localhost:1337/getCategory", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data.length);
      if (res.data.length > 0) {
        res.data.forEach((element) => {
          let applicantDiv = document.createElement("div");
          applicantDiv.setAttribute("class", "applicant");
          //create element from object keys

          let i = 1;
          Object.entries(element).forEach((value) => {
            let valuesP = document.createElement("p");
            let text = document.createTextNode(`${value[0]}: ${value[1]}`);
            valuesP.appendChild(text);
            if (value[0] === "__v") {
              let space = document.createElement("hr");
              valuesP.appendChild(space);
            }
            applicantDiv.appendChild(valuesP);
          });
          //append items to show them on HTML
          document.body.appendChild(applicantDiv);
        });
      }

      let valuesP = document.createElement("p");
      let text = document.createTextNode(`NO DATA`);
      valuesP.appendChild(text);
      document.body.appendChild(valuesP);
    })
    .catch((error) => {
      console.log(error);
    });
});

//fetch all
document.getElementById("all").addEventListener("click", () => {
  // let content = document.getElementsByClassName("content");
  // console.log(content);
  // if (content) {
  //   content.forEach((el) => console.log(el));
  // }

  let contentDiv = document.createElement("div");
  contentDiv.setAttribute("class", "content");
  fetch(`http://localhost:1337/getAll`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        //create div
        let applicantDiv = document.createElement("div");
        applicantDiv.setAttribute("class", "applicant");
        //create element from object keys

        Object.entries(element).forEach((value) => {
          let valuesP = document.createElement("p");
          let text = document.createTextNode(``);
          valuesP.appendChild(text);
          valuesP.innerHTML = `<span class="keys">${value[0]}:</span> <span class="values">${value[1]}</span>`;
          if (value[0] === "__v") {
            let space = document.createElement("hr");
            valuesP.appendChild(space);
          }
          applicantDiv.appendChild(valuesP);
        });
        //append items to show them on HTML
        contentDiv.appendChild(applicantDiv);
        document.getElementById("allApp").appendChild(contentDiv);
      });
    });
});
