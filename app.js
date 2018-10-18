let application = {};

let $ = (selector) => {
    return document.querySelector(selector);
}

application.model = {
    rawData: [
        { 'name': 'eelly', 'count': 0 ,'image':'./images/cat.png'},
        { 'name': 'belly', 'count': 0,'image':'./images/cat2.png' },
        { 'name': 'shelly', 'count': 0,'image':'./images/cat3.png'}]
};

application.view = {
    render: (model) => {
        return () => {
            let list = model;
            model && model.map((element,index) => {
                let li = document.createElement('LI');
                let label = document.createTextNode(`${element.name}`);
                li.appendChild(label);
                application.view.addEventHandlers(li,index,list);
                $("#catList").appendChild(li);
            });
        }
    },
    addEventHandlers : (element,index,list) => {
        element.addEventListener("click",application.view.displayCatDetailsOnClick.bind(this,index,list),true);
    },
    displayCatDetailsOnClick : (index,list) => {
        list[index]["count"] = list[index]["count"]+1;
        let message = $('#catDescription'); 
        let dom = $('#displaySelectedCat');
        let image = $("#imageCat");
        image.setAttribute("src", list[index]["image"]);
        message.innerText = `You clicked cat with ${list[index]["name"]} name ${list[index]["count"]} times`
    },
    addCatInForm : () => {

    }

};


application.controller = {
    init: application.view.render(application.model.rawData),
    addCat: (cat) => {
        application.model.rawData.push({...cat});
        application.view.render(application.model.rawData);
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    application.controller.init();    
});