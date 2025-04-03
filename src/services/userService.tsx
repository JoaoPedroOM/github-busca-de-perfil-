import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const getUserProfile = async (usuario: string) => {
  try {
    const response = await api.get(`/users/${usuario}`);
    const { avatar_url, name, bio } = response.data;
    return { avatar_url, name, bio };
  } catch (error) {
    throw new Error("Erro ao buscar o usuário no GitHub");
  }
};
