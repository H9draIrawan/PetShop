export default function AddPet() {
	return (
		<form>
			<label>Upload Photo</label>
			<input type="file" />
			<br />
			<label>Name Pet : </label>
			<input type="text" />
			<br />
			<label>Age : </label>
			<input type="number" />
			<br />
			<label>Type Pet : </label>
			<br />
			<input type="radio" id="type_pet" /> Dog
			<input type="radio" id="type_pet" /> Cat
			<br />
			<label>Service : </label>
			<input type="checkbox" id="service_pet" /> Mandi
			<input type="checkbox" id="service_pet" /> Potong Kuku
			<input type="checkbox" id="service_pet" /> Potong Rambut
			<br />
		</form>
	);
}
