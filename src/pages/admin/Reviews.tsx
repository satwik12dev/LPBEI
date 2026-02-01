const reviews = [
  { user: "Ravi", rating: 5, comment: "Excellent service!" },
  { user: "Anita", rating: 4, comment: "Good experience" },
];

const Reviews = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-card p-4 rounded-xl shadow-card"
          >
            <p className="font-semibold">{r.user}</p>
            <p>⭐ {r.rating}</p>
            <p className="text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
