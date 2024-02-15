export default function () {
  return {
    Origin: localStorage.getItem('Origin') || '',
    Destination: localStorage.getItem('Destination') || '',
    DepartureDate: localStorage.getItem('DepartureDate') || '',
    ReturnDate: localStorage.getItem('ReturnDate') || '',
  }
}
