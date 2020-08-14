async function getRentals() {
  const rentalFetch = await fetch(
    "https://rentals.prestoapi.com/api/rentals?limit=10",
  );
  const rentalJson = await rentalFetch.json();
  // console.log("rentalJson:", rentalJson);
  const rentals = document.querySelector(".rentals");
  let html = "";

  rentalJson.forEach((rental) => {
    const image = rental.images.picture_url;
    const roomType = rental.room_type;
    const name = rental.name;
    let guests = rental.accommodates;
    let bedrooms = rental.bedrooms;
    let beds = rental.beds;
    let baths = rental.bathrooms;
    const amenities = rental.amenities.slice(0, 3).join(" · ");
    const stars = rental.review_scores.review_scores_value
      ? parseInt(rental.review_scores.review_scores_value) / 2
      : 0;
    const reviewers = rental.number_of_reviews;
    const price = rental.price;

    // work out plurals
    guests = guests > 1 ? `${guests} guests` : `${guests} guest`;
    bedrooms = bedrooms > 1 ? `${bedrooms} bedrooms` : `${bedrooms} bedroom`;
    beds = beds > 1 ? `${beds} beds` : `${beds} bed`;
    baths = baths > 1 ? `${baths} baths` : `${baths} bath`;

    html += `
      <div class="card mb-3">
        <img class="card-img-top" width="100%" src="${image}" />
        <div class="card-body">
          <div class="card-title">${roomType}</div>
          <div class="card-title">${name}</div>
          <small class="card-text">${guests} · ${bedrooms} · ${beds} · ${baths}</small>
          <small>${amenities}</small>
          <div>
            <div>&star; <strong>${stars}</strong> (${reviewers})</div>
            <div><strong>$${price}</strong> / night</div>
          </div>
        </div>
      </div>
    `;
  });

  rentals.innerHTML = html;
}

getRentals();
