import { useNavigate } from "react-router-dom";

function NoticePage({ loginStatus }) {
  const navigate = useNavigate();
  const group_type = localStorage.getItem("group_type");
  localStorage.setItem("test_num", 1);
  const onNextPage = () => {
    navigate(`/group/${group_type}`);
  };

  return (
    <div>
      <h2>Direction</h2>
      <p>
        Individuals in a team participate in a game in which they need to sell
        10 bitcoins given to each team at a price agreed by team members (team
        average). They can sell only one coin at a time. Accordingly, they have
        10 chances to sell their coins. In the game, individuals can suggest
        expected and desired prices two times: before and after recognizing
        their teams’ average price or AI suggested price. Individuals need to
        suggest their own expected price based on their understanding of the
        market within 30 seconds. Once all team members complete to suggest
        their prices, individuals can see team average prices and/or AI
        suggested prices. Then, within a minute, they have a chance to revise
        their initial expected prices by clicking YES for the question “will you
        change your initial estimate?” on the screen and then they can suggest
        final expected prices. If individuals click NO on the screen, their
        initial expected price will used for the calculation of team average
        price. When all team members complete to suggest their final expected
        prices, team average value will be calculated. If the team value is in
        the range of +/- 5% of the price at the time when team average values
        are calculated, the coin will be sold with the suggested price. If the
        price is outside the range, the coin will not be sold and teams’ cash
        settlement will fail. Over the 10 chances, the amount of cash only for
        the successful deals will be accumulated. Team performance will be
        counted based on the amount of cash that the team obtained. Based on the
        performance, team members can share their profits (accumulated cash they
        gain from selling the coins, divided by 1,000 and by the number of
        contributions (when participants miss their chance to suggest, the
        contributions will not be counted).
      </p>
      <button onClick={onNextPage}>Ok</button>
    </div>
  );
}

export default NoticePage;
