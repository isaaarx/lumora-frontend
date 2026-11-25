import { useEffect, useState } from "react";
import { getCharacters } from "../api.js";

export default function CharacterPicker({ onSelect, disabled, activeId }) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ status: "loading", characters: [] });
  useEffect(() => {
    let active = true;
    getCharacters()
      .then((result) => {
        if (!Array.isArray(result.characters))
          throw new Error("Lista inválida.");
        if (active)
          setState({ status: "ready", characters: result.characters });
      })
      .catch(() => {
        if (active) setState({ status: "error", characters: [] });
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  return (
    <section aria-labelledby="character-title" className="character-picker">
      <h2 id="character-title">1. Escolha um técnico para iniciar o chat</h2>
      <p className="muted">Clique em um nome abaixo. São personagens fictícios; o servidor define o acesso da sessão.</p>
      {state.status === "loading" && (
        <p role="status">Carregando personagens…</p>
      )}
      {state.status === "error" && (
        <p role="alert">Não foi possível carregar os técnicos. Confira se a API está em execução na porta 8000 e tente novamente.</p>
      )}
      {state.status === "ready" && !state.characters.length && (
        <p>Nenhum personagem disponível.</p>
      )}
      {state.characters.map((character) => (
        <button
          className="character"
          key={character.id}
          disabled={disabled}
          onClick={() => onSelect(character.id)}
        >
          <span className="avatar" aria-hidden="true">
            {character.name.charAt(0)}
          </span>
          <span>
            {character.name}
            {activeId === character.id && (
              <small>Contexto atual · iniciar outro</small>
            )}
          </span>
          <span aria-hidden="true">→</span>
        </button>
      ))}
      {state.status !== "loading" && (
        <button
          className="secondary"
          disabled={disabled}
          onClick={() => {
            setState({ status: "loading", characters: [] });
            setAttempt((value) => value + 1);
          }}
        >
          Tentar novamente a leitura
        </button>
      )}
    </section>
  );
}
