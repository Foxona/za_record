const users = [
  {
    userName: "@furry_cring",
    followers: 1337,
    avatarImage: "#",
  },
  {
    userName: "@realoleg",
    followers: 1488,
    avatarImage: "#",
  },
];

makeAutoObservable(users)

const commentaries = [
  { message: "i like cum", date: "20.04.2057" },
  {
    message:
      "i really like cum like so much i sometimes cum thinking about cum",
    date: "21.05.2058",
  },
  { message: "gavno", date: "25.05.2024" },
];

let price = "200$";

const cardCreds = {
  cardNumber: "3456_7890_1111_2222",
  cvc: 234,
  price,
  paymentRequested: false,
};

const UserTab = ({ userName, followers, avatarImage }) => {
  return (
    <div>
      <p>{userName}</p>
      <p>{followers}</p>
      <img src={avatarImage} />
    </div>
  );
};

const SubButton = ({ userName }: { userName: string }) => {
  return (
    <button
      onClick={() => {
        const id = users.findIndex((u) => u.userName === userName);
        setTimeout(() => (users[id].followers += 1), 1111);
      }}
    >
      sbuscirenbe
    </button>
  );
};

const Home = observer(() => {
  return users.map((currentUser) => (
    <div key={currentUser.userName}>
      <UserTab
        userName={currentUser.userName}
        followers={currentUser.followers}
        avatarImage={currentUser.avatarImage}
      />
      <SubButton userName={currentUser.userName} />
    </div>
  ));
});

setInterval(() => {
  users[0].followers += 1;
}, 10000);
