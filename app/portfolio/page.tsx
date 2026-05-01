"use client";

const landings = [
  { title: "AV Studio", url: "https://avstudio.agency" },
  { title: "Проект 2", url: "#" },
  { title: "Проект 3", url: "#" },
];

const bots = [
  {
    title: "Бот для записи клиентов",
    url: "#",
    given: "Салон красоты, 200+ клиентов, всё через директ",
    done: "Телеграм-бот с записью, напоминаниями и отменой",
    features: ["Онлайн-запись 24/7", "Напоминания за 2 часа", "Интеграция с Google Calendar"],
  },
  {
    title: "Бот поддержки для e-com",
    url: "#",
    given: "Интернет-магазин, 50+ однотипных вопросов в день",
    done: "GPT-бот с базой знаний по товарам и доставке",
    features: ["Отвечает на 80% вопросов без участия человека", "Передаёт сложные кейсы оператору", "Обучается на новых FAQ"],
  },
];

export default function Portfolio() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#fff",
      color: "#000",
      fontFamily: "system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "clamp(2rem, 5vw, 5rem)",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <h1 style={{
        fontSize: "clamp(2rem, 5vw, 5rem)",
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        textTransform: "uppercase",
        maxWidth: "18ch",
        marginBottom: "clamp(3rem, 6vw, 6rem)",
      }}>
        Делаю быстро, дёшево и круто.{" "}
        <span style={{ color: "#aaa" }}>Вот мои работы:</span>
      </h1>

      {/* Two columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "clamp(2rem, 6vw, 8rem)",
        alignItems: "start",
      }}>

        {/* Лендинги */}
        <div>
          <p style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#aaa",
            marginBottom: "1.25rem",
          }}>
            Лендинги
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {landings.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 0",
                  borderTop: "1px solid #e5e5e5",
                  textDecoration: "none",
                  color: "#000",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#aaa")}
                onMouseLeave={e => (e.currentTarget.style.color = "#000")}
              >
                <span>{l.title}</span>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>↗</span>
              </a>
            ))}
            <div style={{ borderTop: "1px solid #e5e5e5" }} />
          </div>
        </div>

        {/* Чат-боты */}
        <div>
          <p style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#aaa",
            marginBottom: "1.25rem",
          }}>
            Чат-боты
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {bots.map((b, i) => (
              <div key={i} style={{ borderTop: "1px solid #e5e5e5", padding: "1.25rem 0" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                      fontWeight: 500,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#aaa")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#000")}
                  >
                    {b.title} ↗
                  </a>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.4rem" }}>Дано</p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "#555" }}>{b.given}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.4rem" }}>Сделано</p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "#555" }}>{b.done}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.4rem" }}>Возможности</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {b.features.map((f, j) => (
                        <li key={j} style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "#555" }}>— {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e5e5e5" }} />
          </div>
        </div>

      </div>
    </main>
  );
}
