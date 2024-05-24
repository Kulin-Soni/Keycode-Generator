const words = {
   "A": "2",
   "B": "22",
   "C": "222",
   "2": "2222",
   "D": "3",
   "E": "33",
   "F": "333",
   "3": "3333",
   "G": "4",
   "H": "44",
   "I": "444",
   "4": "4444",
   "J": "5",
   "K": "55",
   "L": "555",
   "5": "5555",
   "M": "6",
   "N": "66",
   "O": "666",
   "6": "6666",
   "P": "7",
   "Q": "77",
   "R": "777",
   "S": "7777",
   "7": "77777",
   "T": "8",
   "U": "88",
   "V": "888",
   "8": "8888",
   "W": "9",
   "X": "99",
   "Y": "999",
   "Z": "9999",
   "9": "99999",
   " ": "00",
   ".": "1",
   "-": "11"
}
const filterString = (str, allowed) => str.split('').filter(c => allowed.includes(c)).join('');
function txtToCode(input) {
   let str = input.toUpperCase(),
      codarr = [],
      codstr;
   str = filterString(str, Object.keys(words));
   console.log(str);
   str = Array.from(str);
   for (let i = 0; i < str.length; i++) {
      codarr.push(`${words[str[i]]}`);
   }
   codstr = codarr.join('-')
   return codstr;
}
function getValue(object, value) {
   return Object.keys(object).find(key => object[key] === value);
}

function codeToTxt(code) {
   let codedstr = code,
      decstr = "";
   codedstr = filterString(codedstr, (Object.values(words)+'-'));
   console.log(codedstr);
   codedstr = codedstr.split("-");
   for (let i = 0; i < codedstr.length; i++) {
      decstr += getValue(words, `${codedstr[i]}`);
   }
   return decstr;
}

function createRipple(event) {
   const button = event.currentTarget;

   const circle = document.createElement("span");
   const diameter = Math.max(button.clientWidth, button.clientHeight);
   const radius = diameter / 2;

   circle.style.width = circle.style.height = `${diameter}px`;
   circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
   circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
   circle.classList.add("ripple");

   const ripple = button.getElementsByClassName("ripple")[0];

   if (ripple) {
      ripple.remove();
   }

   button.appendChild(circle);
}
const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
   button.addEventListener("click", createRipple);
}



const changeType = document.querySelectorAll("input[name='option']");
let textValue = document.querySelector("#inputvalue");
let currentForm = 1;
changeType.forEach((x) => {
   x.addEventListener('change', () => {
      let changeValue = x.value;
      if (changeValue == "texttocode") {
         textValue.placeholder = "Write something here";
         currentForm = 1;
      } else {
         textValue.placeholder = "9-777-444-8-33-00-7777-666-6-33-8-44-444-66-4";
         currentForm = 2;
      }
   })
})

const convert = document.querySelector("#convert");
let output = document.querySelector("#output");
convert.addEventListener('click', ()=>{
   let textValue = document.querySelector("#inputvalue");
   if (currentForm == 1) {
         output.innerHTML = txtToCode(textValue.value);
      } else if (currentForm == 2) {
         output.innerHTML = codeToTxt(textValue.value || "00") || "";
      }
})

const copybutton = document.getElementById("copy");
copybutton.addEventListener('click', ()=>{
   copybutton.style.cssText = "background: limegreen;";
   navigator.clipboard.writeText(output.innerHTML);
   setTimeout(()=>{
      copybutton.style.cssText = "background: var(--third);"
   }, 1000)
})