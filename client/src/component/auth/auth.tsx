import { useCallback } from "react";
import { supabase } from "../../utils/supabase";

export default function Auth() {
  const onClick = useCallback(async () => {
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: "chammyae@gmail.com",
    //   password: "123456",
    // });
    // console.log({ data, error });
    // sign up
    const { data, error } = await supabase.auth.signUp({
      email: "chammyae@gmail.com",
      password: "123456",
    });
    console.log({ data, error });
  }, []);
  return (
    <div>
      <button onClick={onClick}>Login</button>
    </div>
  );
}
