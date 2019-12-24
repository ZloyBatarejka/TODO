import React from "react";
import { Form } from "./components/Form/Form";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/" component={Form} />
    </Switch>
  );
}

export default App;
