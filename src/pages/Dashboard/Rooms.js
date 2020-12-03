import React, {
	useState,
	useEffect
} from 'react';

const Rooms = (props) => {

	const statusToClass = new Map([
		['ready', 'btn-outline-success'],
		['occupied', 'btn-outline-dark'],
		['clean', 'btn-outline-warning'],
		['dirty', 'btn-outline-danger']
	])
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_APIURL_DEV + '/rooms/getRooms', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			},
			body: JSON.stringify({
				systemID: "uCC71TCZddvWGXWxtXK9E"
			}),
			method: "POST"
		}).then(response => {
			return response.json();
		}).then((data) => {
			setRooms(data.rooms[0].rooms.sort((a, b) => (a._id > b._id) ? 1 : -1));
		});
	}, [])

  return(<React.Fragment>
		<div className="m-3">
			{
				rooms.map((room, key) =>
          <button className = {`btn-lg btn-room ${statusToClass.get(room.status)}`}>
             {room._id}
          </button>)
			}
		</div>
	</React.Fragment>)

}

export default Rooms;
