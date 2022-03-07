class CommandRow {
    constructor() {
        this.trCommand = document.createElement("tr");
        this.tdPos = document.createElement("td");
        this.tdGit = document.createElement("td");
        this.tdBase = document.createElement("td");
        this.tdBas = document.createElement("td");
        this.tdDelete = document.createElement("td");
        this.tdAdd = document.createElement("td");
        this.selectBase = document.createElement("select");
        this.aDelete = document.createElement("a");
        this.aAdd = document.createElement("a");
        this.imgDelete = document.createElement("img");
        this.imgAdd = document.createElement("img");
    }

    initRow(pos, arrayBases, base) {
        this.tdGit.innerHTML = "Git";

        this.tdPos.className  = "fijo";
        this.tdGit.className  = "fijo";
        this.tdDelete.className  = "fijo";
        this.tdAdd.className  = "fijo";
        this.aDelete.className  = "btn btn-sm btn-danger";
        this.aAdd.className  = "btn btn-sm btn-success";
        this.imgDelete.className  = "icono";
        this.imgAdd.className  = "icono";

        this.imgDelete.src = "img/delete.png";
        this.imgAdd.src = "img/nuevo.png";

        this.trCommand.appendChild(this.tdPos);
        this.trCommand.appendChild(this.tdGit);
        this.trCommand.appendChild(this.tdBase);
        this.trCommand.appendChild(this.tdDelete);
        this.trCommand.appendChild(this.tdAdd);

        this.tdBase.appendChild(this.selectBase);

        this.tdDelete.appendChild(this.aDelete);
        this.aDelete.appendChild(this.imgDelete);

        this.tdAdd.appendChild(this.aAdd);
        this.aAdd.appendChild(this.imgAdd);

        for (var i = 0; i < arrayBases.length; i++) {
          var opt = document.createElement("option");
          opt.value = i+1;
          opt.innerHTML = arrayBases[i];
          this.selectBase.appendChild(opt);
        }

        this.tdPos.innerHTML = pos;
        this.tdBas.innerHTML = base;

      this.selectBase.options[base].selected = "selected";
    }
  }