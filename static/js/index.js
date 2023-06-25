// // JavaScript code
// const submitBtn = document.getElementById("start-button");
// submitBtn.addEventListener("click", function () {
//   const radiocolor = document.getElementsByName("color");
//   const radiobot = document.getElementsByName("bot");

//   let selectedcolor;
//   for (let i = 0; i < radiocolor.length; i++) {
//     if (radiocolor[i].checked) {
//       selectedcolor = radiocolor[i].value;
//       break;
//     }
//   }

//   let selectedbot;
//   for (let i = 0; i < radiobot.length; i++) {
//     if (radiobot[i].checked) {
//       selectedbot = radiobot[i].value;
//       break;
//     }
//   }
// });
// //   let data = { color: selectedcolor, bot: selectedbot };
// //   sendingData = JSON.stringify(data);
// //   let csrftoken = document.cookie.split("=")[1];

// //   fetch("/game_start", {
// //     method: "POST",
// //     body: JSON.stringify(data),
// //     headers: {
// //       "Content-Type": "application/json",
// //       "X-CSRFToken": csrftoken,
// //     },
// //   })
// //     .then((response) => response)
// //     .then((data) => console.log(data))
// //     .catch((error) => console.error(error));
// // });
// // .then((response) => response)
// // .then((data) => (location.href = data["url"]))
