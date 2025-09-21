import { errorModal, restaurantModal, restaurantRow } from "./components";
import { fetchData } from "./functions";
import { apiUrl, positionOptions } from "./variables";
import { Restaurant, Menu } from "./types";

const modal = document.querySelector("dialog") as HTMLDialogElement | null;
if (!modal) {
  throw new Error("Modal not found");
}
modal.addEventListener("click", () => {
  modal.close();
});

const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const createTable = (restaurants: Restaurant[]): void => {
  const table = document.querySelector("table") as HTMLTableElement | null;
  if (!table) return;

  table.innerHTML = "";
  restaurants.forEach((restaurant) => {
    const tr = restaurantRow(restaurant);
    table.appendChild(tr);


    tr.addEventListener("click", async () => {
      try {
        document.querySelectorAll(".highlight").forEach((el) =>
          el.classList.remove("highlight")
        );
        tr.classList.add("highlight");
        modal.innerHTML = "";

        const menu = await fetchData<Menu>(
          `${apiUrl}/restaurants/daily/${restaurant._id}/fi`
        );
        const menuHtml = restaurantModal(restaurant, menu);
        modal.insertAdjacentHTML("beforeend", menuHtml);
        modal.showModal();
      } catch (err) {
        modal.innerHTML = errorModal((err as Error).message);
        modal.showModal();
      }
    });
  });
};

const geoError = (err: GeolocationPositionError): void => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const geoSuccess = async (pos: GeolocationPosition): Promise<void> => {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData<Restaurant[]>(`${apiUrl}/restaurants`);

    restaurants.sort((a, b) => {
      const x1 = crd.latitude;
      const y1 = crd.longitude;
      const [y2a, x2a] = a.location.coordinates;
      const [y2b, x2b] = b.location.coordinates;
      const distanceA = calculateDistance(x1, y1, x2a, y2a);
      const distanceB = calculateDistance(x1, y1, x2b, y2b);
      return distanceA - distanceB;
    });

    createTable(restaurants);

    const sodexoBtn = document.querySelector("#sodexo") as HTMLButtonElement | null;
    const compassBtn = document.querySelector("#compass") as HTMLButtonElement | null;
    const resetBtn = document.querySelector("#reset") as HTMLButtonElement | null;

    sodexoBtn?.addEventListener("click", () => {
      createTable(restaurants.filter((r) => r.company === "Sodexo"));
    });

    compassBtn?.addEventListener("click", () => {
      createTable(restaurants.filter((r) => r.company === "Compass Group"));
    });

    resetBtn?.addEventListener("click", () => {
      createTable(restaurants);
    });
  } catch (err) {
    modal.innerHTML = errorModal((err as Error).message);
    modal.showModal();
  }
};

navigator.geolocation.getCurrentPosition(geoSuccess, geoError, positionOptions);

