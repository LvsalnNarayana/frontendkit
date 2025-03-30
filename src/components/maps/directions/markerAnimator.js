const animateMarker = () => {
    if (!leg || !leg.steps || !map) return;

    const newPath = [];
    const steps = leg.steps.reduce((acc, step, index) => {
      acc[index] = (index === 0 ? 0 : acc[index - 1]) + step.path.length;
      return acc;
    }, {});
    leg.steps.forEach((step) => newPath.push(...step.path));
    const densePath = [];
    for (let i = 0; i < newPath.length - 1; i++) {
      const start = newPath[i];
      const end = newPath[i + 1];
      const stepsBetween = 1; // Number of intermediate points
      for (let j = 0; j <= stepsBetween; j++) {
        const t = j / stepsBetween;
        const lat = start.lat() + (end.lat() - start.lat()) * t;
        const lng = start.lng() + (end.lng() - start.lng()) * t;
        densePath.push(new window.google.maps.LatLng(lat, lng));
      }
    }
    console.log(densePath);

    setPath(densePath);

    if (marker) marker.setMap(null);

    const newMarker = new window.google.maps.Marker({
      position: newPath[0],
      map,
      title: "Moving Marker",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new window.google.maps.Size(30, 30),
      },
    });
    setMarker(newMarker);

  }