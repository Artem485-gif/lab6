document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll('input[name="genre"]');
    const allFilter = document.querySelector('input[name="genre"][value="all"]');
    const cards = document.querySelectorAll(".movie-card");
    const catalog = document.querySelector(".catalog-grid");

    if (!filters.length || !allFilter || !cards.length || !catalog) {
        console.error("Не знайдено елементи фільтрації каталогу.");
        return;
    }

    const message = document.createElement("p");
    message.className = "filter-message";
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");
    catalog.insertAdjacentElement("afterend", message);

    function filterMovies() {
        const selectedGenres = Array.from(filters)
            .filter(filter => filter.checked && filter.value !== "all")
            .map(filter => filter.value);

        if (selectedGenres.length === 0) {
            allFilter.checked = true;
        } else {
            allFilter.checked = false;
        }

        let visibleCount = 0;

        cards.forEach(card => {
            const genreElement = card.querySelector("data");
            const genre = genreElement?.getAttribute("value");

            const isVisible =
                selectedGenres.length === 0 ||
                selectedGenres.includes(genre);

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        message.textContent = `Знайдено фільмів: ${visibleCount}`;
    }

    filters.forEach(filter => {
        filter.addEventListener("change", event => {
            if (event.target.value === "all" && event.target.checked) {
                filters.forEach(item => {
                    if (item.value !== "all") {
                        item.checked = false;
                    }
                });
            }

            if (event.target.value !== "all" && event.target.checked) {
                allFilter.checked = false;
            }

            filterMovies();
        });
    });

    filterMovies();
});
