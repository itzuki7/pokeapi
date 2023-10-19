const input = document.getElementById("barraBusqueda");
        const resultadosDiv = document.getElementById("resultadosLista");
        const ventanaEmergente = document.getElementById("ventanaEmergente");
        const detallesPokemon = document.getElementById("detallesPokemon");
        const cerrarVentanaEmergente = document.getElementById("cerrarVentanaEmergente");

        input.addEventListener("input", function () {
            const inputText = this.value;

            // Limpia los resultados previos
            resultadosDiv.innerHTML = "";

            if (inputText.trim() === "") {
                return;
            }

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`)
                .then(response => response.json())
                .then(data => {
                    const pokemones = data.results;
                    pokemones
                        .filter(pokemon => pokemon.name.includes(inputText.toLowerCase()))
                        .forEach(pokemon => {
                            fetch(pokemon.url)
                                .then(response => response.json())
                                .then(data => {
                                    const listItem = document.createElement("li");
                                    const pokemonImage = data.sprites.front_default;
                                    listItem.innerHTML = `
                                        <img src="${pokemonImage}" alt="${data.name}" width="50" height="50" />
                                        <span>${data.name}</span>
                                    `;
                                    listItem.addEventListener("click", () => {
                                        mostrarVentanaEmergente(data);
                                    });
                                    resultadosDiv.appendChild(listItem);
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        });
                })
                .catch(error => {
                    resultadosDiv.innerHTML = `<p>Error: ${error.message}</p>`;
                });
        });

        function mostrarVentanaEmergente(data) {
            detallesPokemon.innerHTML = `
                <h3>${data.name}</h3>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <p>Altura: ${data.height} m</p>
                <p>Peso: ${data.weight} K</p>
                <p>Tipo(s): ${data.types.map(type => type.type.name).join(", ")}</p>
            `;
            ventanaEmergente.style.display = "block";
        }

        cerrarVentanaEmergente.addEventListener("click", function () {
            ventanaEmergente.style.display = "none";
        });