const Result = ({ character }) => {

  const dataResults = 
  character.map((c) => (
      <tr key={c.id}>
        <td>{c.name}</td>
        <td>{c.birth_year}</td>
        <td>{c.height}</td>
        <td>{c.mass}</td>
        <td>{c.species}</td>
        <td>{c.homeworld}</td>
      </tr>
  ));
  return (
    <div>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Species</th>
            <th>Homeworld</th>
          </tr>
        </thead>
        <tbody>
          {dataResults}
        </tbody>
      </table>
    </div>
  );
};

export default Result;