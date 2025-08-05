const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507-FTB-ET-WEB-FT/events";

// const APIid =
//   "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2507-FTB-ET-WEB-FT/events/{id}";

// const APIGuest =
// ("https://fsa-crud-2aa9294fe819.herokuapp.com/api/#tag/Guests/operation/DeleteGuest");

let parties = [];
let selectedParty;

const getParties = async () => {
  try {
    const res = await fetch(API);
    const data = await res.json();

    parties = data.data;
    console.log(parties);
    main();
  } catch (e) {
    console.error(e);
  }
};

const getParty = async (id) => {
  try {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();

    selectedParty = data.data;
    main();
    console.log(selectedParty);
  } catch (e) {
    console.error(e);
  }
};

const PartyListItem = (party) => {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  $a.setAttribute("href", "#selected");
  $a.textContent = party.name;
  //   $a.id = party.id;
  $a.addEventListener("click", (e) => {
    getParty(party.id);
  });

  $li.append($a);

  return $li;
};

const PartyList = () => {
  const $div = document.createElement("div");
  for (const party of parties) {
    $div.append(PartyListItem(party));
  }
  return $div;
};

const PartyDetails = () => {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $section = document.createElement("section");
  const $h3 = document.createElement("h3");
  const $p = document.createElement("p");
  const $address = document.createElement("address");
  $section.classList.add("party");
  $h3.textContent = `${selectedParty.name} #${selectedParty.id}`;
  $address.textContent = `${selectedParty.location}`;
  $p.textContent = `${selectedParty.date} ${selectedParty.description}`;
  $section.append($h3);
  $section.append($address);
  $section.append($p);
  return $section;
};

const main = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
        <section>
            <h2>Upcoming Parties</h2>
            <PartyList></PartyList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <PartyDetails></PartyDetails>
        </section>
    </main>`;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
};

const init = async () => {
  await getParties();
  main();
};

init();
