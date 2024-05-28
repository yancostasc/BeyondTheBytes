import React, { useState } from "react";

const RegisterAddress: React.FC = () => {
  const [planet, setPlanet] = useState<"Terra" | "Marte">("Terra");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Endereço cadastrado: ${planet} - ${location}`);
  };

  return (
    <div>
      <h1>Cadastro de Endereço</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Planeta:
            <select
              value={planet}
              onChange={(e) => setPlanet(e.target.value as "Terra" | "Marte")}
            >
              <option value="Terra">Terra</option>
              <option value="Marte">Marte</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Localização:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={
                planet === "Terra" ? "Cidade, País" : "Lote de 4 dígitos"
              }
              required
            />
          </label>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterAddress;
