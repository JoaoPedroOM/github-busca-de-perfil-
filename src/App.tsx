import { useState } from "react";

import githubLogo from "./assets/img/icones/githubLogo.svg";
import github from "./assets/img/svg/github.svg";
import search from "./assets/img/icones/search.svg";
import details from "./assets/img/svg/details.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { buscaSchema } from "./schema/searchSchema";
import { getUserProfile } from "./services/userService";
import type { UserProfile } from "./types/UserProfile";
import UserDetails from "./components/UserDetails";
import Error from "./components/Error";
import { PulseLoader } from "react-spinners";

const App = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: zodResolver(buscaSchema),
    mode: "onSubmit",
  });

  console.log(error);

  const handleSearchUser = async (data: { usuario: string }) => {
    setError(null);
    setLoading(true);
    setUserData(null);
    try {
      const result = await getUserProfile(data.usuario);
      setUserData(result);
      setError(null);
      reset();
    } catch (err) {
      setError("Erro ao buscar o usuário. Tente novamente.");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = () => {
    setUserData(null);
  };

  return (
    <main className="relative w-screen h-screen flex justify-center items-center">
      <img
        src={details}
        alt="Detalhe decorativo"
        className="absolute z-[9] pointer-events-none lg:top-14 lg:left-72 top-10 left-0"
      />

      <div className="w-full h-full bg-hero-pattern bg-center bg-cover absolute z-0" />

      <div className="bg-black relative z-10 text-white md:p-8 px-4 pt-6 w-full max-w-6xl h-[520px] mx-4">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center gap-2">
            <img src={githubLogo} alt="Logo GitHub" />
            <span className="md:text-[60px] text-[40px] font-semibold font-main flex gap-2">
              Perfil{" "}
              <img
                src={github}
                alt="Logo GitHub"
                className="md:w-auto w-[120px]"
              />
            </span>
          </div>
        </div>

        <form
          className="relative flex items-center justify-center md:w-[60%] w-full mx-auto"
          onSubmit={handleSubmit(handleSearchUser)}
        >
          <input
            type="text"
            id="usuario"
            {...register("usuario")}
            placeholder="Digite um usuário do Github"
            className="p-4 w-full font-main text-black rounded-lg border focus:outline-none focus:border-[#005CFF]"
            onChange={handleChange}
          />
          <button
            className="absolute right-[2px] top-[2px] bottom-[2px] bg-[#005CFF] px-5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            <img src={search} alt="Buscar" className="w-5 h-5" />
          </button>
        </form>

        <p className="text-base text-center mt-2 font-main font-semibold text-red-800">
          <ErrorMessage errors={errors} name="usuario" />
        </p>

        {error && <Error />}

        {loading && !userData && (
          <div className="flex items-center justify-center h-[60%] mx-auto">
            <PulseLoader color="#005CFF" speedMultiplier={0.8} />
          </div>
        )}

        {!errors.usuario && userData && <UserDetails data={userData} />}
      </div>
    </main>
  );
};

export default App;
