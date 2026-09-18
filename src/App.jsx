import { useEffect, useRef, useState } from 'react'
import { birthdayContent as content } from './content.js'
import { createBirthdayPlayer } from './audio.js'

const confettiColors = ['#F58FAF', '#FFD978', '#A8D8C5', '#9D3F68', '#ffffff']

function Confetti({ active }) {
  if (!active) return null
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 42 }, (_, index) => (
        <i
          key={index}
          style={{
            '--x': `${(index * 47) % 100}vw`,
            '--delay': `${(index % 9) * 0.055}s`,
            '--duration': `${1.7 + (index % 6) * 0.16}s`,
            '--spin': `${180 + (index % 5) * 90}deg`,
            '--color': confettiColors[index % confettiColors.length],
          }}
        />
      ))}
    </div>
  )
}

function GiftIntro({ onOpen, opening }) {
  return (
    <section className={`gift-intro ${opening ? 'is-opening' : ''}`} aria-label="افتحي هدية عيد الميلاد">
      <div className="intro-doodles" aria-hidden="true">
        <span>✦</span><span>♥</span><span>☻</span><span>✿</span>
      </div>
      <p className="tiny-note">هدية صغيرة جاية لحد عندك</p>
      <button className="gift" onClick={onOpen} disabled={opening} aria-label="افتحي الهدية يا بوبا">
        <span className="gift-lid"><i /><b /></span>
        <span className="gift-box"><i /></span>
        <span className="gift-tag">لبوبا</span>
      </button>
      <h1>يا بوبا… في حاجة صغيرة مستنياكي</h1>
      <button className="open-hint" onClick={onOpen} disabled={opening}>
        <span>{opening ? 'بتتفتح…' : 'دوسي على الهدية'}</span>
        <span aria-hidden="true">←</span>
      </button>
    </section>
  )
}

function PhotoPlaceholder({ index, name }) {
  const motifs = ['✿', '☕', '♥', '✦', '☻', '🎂']
  return (
    <div className={`photo-placeholder placeholder-${index % 3}`} aria-hidden="true">
      <span>{motifs[index % motifs.length]}</span>
      <strong>{name}</strong>
      <small>الصورة هنا</small>
    </div>
  )
}

function Photo({ photo, index, hero = false }) {
  const [failed, setFailed] = useState(false)
  const hasImage = photo?.src && !failed
  if (!hasImage) return <PhotoPlaceholder index={index} name={content.nickname} />

  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading={hero ? 'eager' : 'lazy'}
      fetchPriority={hero ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}

function Hero() {
  return (
    <header className="hero section-shell">
      <div className="hero-copy">
        <p className="eyebrow">النهارده — اليوم بتاعك</p>
        <h1>كل سنة وإنتِ<br /><em>طيبة يا بوبا</em></h1>
        <p className="hero-lede">النهارده سبب كويس جدًا إننا نقول لك: وجودك خفيف، وروحك حلوة، ويومك يستاهل يبقى مميز.</p>
        <a href="#album" className="scroll-note">انزلي شوفي الهدية <span aria-hidden="true">↓</span></a>
      </div>
      <div className="hero-photo-wrap">
        <div className="tape tape-top" aria-hidden="true" />
        <div className="hero-photo">
          <Photo photo={content.heroPhoto} index={0} hero />
        </div>
        <p>birthday girl ✦</p>
        <span className="scribble" aria-hidden="true">أحلى بوبا!</span>
      </div>
    </header>
  )
}

function Album({ onSelect }) {
  return (
    <section className="album section-shell" id="album" aria-labelledby="album-title">
      <div className="section-heading">
        <span className="hand-note">كام لقطة حلوة</span>
        <h2 id="album-title">الألبوم بتاعك</h2>
        <p>الصور اللي بنحب نرجعلها من غير مناسبة… والنهارده عندنا أحلى مناسبة.</p>
      </div>
      <div className="polaroid-grid">
        {content.photos.map((photo, index) => (
          <button
            className={`polaroid polaroid-${index + 1}`}
            key={`${photo.src}-${index}`}
            onClick={() => onSelect(index)}
            aria-label={`تكبير: ${photo.caption}`}
          >
            <span className="photo-frame"><Photo photo={photo} index={index} /></span>
            <span className="photo-caption">{photo.caption}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function Moments() {
  const arabicNumbers = ['٠١', '٠٢', '٠٣']
  return (
    <section className="moments section-shell" aria-labelledby="moments-title">
      <div className="section-heading compact">
        <span className="hand-note">مش بالعدد</span>
        <h2 id="moments-title">حاجات بسيطة بس علّمت معانا</h2>
        <p>يمكن ما اتقابلناش كتير، بس الحلو مش لازم يبقى كتير عشان يتفتكر.</p>
      </div>
      <div className="moment-list">
        {content.moments.map((moment, index) => (
          <article className="moment-card" key={moment.title}>
            <span className="moment-number">{arabicNumbers[index]}</span>
            <span className="moment-icon" aria-hidden="true">{moment.icon}</span>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Letter() {
  return (
    <section className="letter-section section-shell" aria-labelledby="letter-title">
      <div className="letter-paper">
        <span className="paperclip" aria-hidden="true" />
        <p className="letter-date">في يوم ميلاد بوبا ♡</p>
        <h2 id="letter-title">كلمتين من القلب</h2>
        {content.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="signature">
          <span>منّا إحنا الاتنين،</span>
          <strong>{content.senderName} وسلومة</strong>
        </div>
      </div>
    </section>
  )
}

function Cake() {
  const [wishMade, setWishMade] = useState(false)
  return (
    <section className={`wish-section ${wishMade ? 'wish-made' : ''}`} aria-labelledby="wish-title">
      <div className="wish-copy">
        <span className="hand-note">آخر حاجة…</span>
        <h2 id="wish-title">فاضل تتمني أمنية</h2>
        <p>{wishMade ? 'خلاص اتسجلت… والباقي على السنة الجديدة ✨' : 'دوسي على الشمع وغمّضي عينك ثانية.'}</p>
      </div>
      <button className="cake" onClick={() => setWishMade(true)} disabled={wishMade} aria-label={wishMade ? 'تم إطفاء الشموع' : 'اطفئي شموع عيد الميلاد'}>
        <span className="candles" aria-hidden="true">
          {[0, 1, 2].map((candle) => <i key={candle}><b /></i>)}
        </span>
        <span className="cake-top" />
        <span className="cake-middle">بوبا</span>
        <span className="cake-plate" />
      </button>
      {wishMade && <p className="final-wish" role="status">كل سنة وإنتِ مبسوطة يا محبوبة ♡</p>}
    </section>
  )
}

function Lightbox({ selected, onClose }) {
  useEffect(() => {
    if (selected === null) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [selected, onClose])

  if (selected === null) return null
  const photo = content.photos[selected]
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="عرض الصورة بحجم كبير" onMouseDown={onClose}>
      <div className="lightbox-card" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} autoFocus aria-label="إغلاق الصورة">×</button>
        <div className="lightbox-image"><Photo photo={photo} index={selected} /></div>
        <p>{photo.caption}</p>
      </div>
    </div>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef(null)

  useEffect(() => () => playerRef.current?.destroy(), [])

  const startMusic = async () => {
    if (!playerRef.current) {
      playerRef.current = createBirthdayPlayer(() => setIsPlaying(false))
    }
    if (!playerRef.current) return

    setIsPlaying(true)
    try {
      await playerRef.current.play()
    } catch {
      // بعض المتصفحات قد تمنع الصوت؛ يظل الزر متاحًا للمحاولة يدويًا.
      setIsPlaying(false)
    }
  }

  const openGift = () => {
    if (opening) return
    startMusic()
    setOpening(true)
    setConfetti(true)
    window.setTimeout(() => setOpened(true), 720)
    window.setTimeout(() => setConfetti(false), 2900)
  }

  const toggleMusic = async () => {
    if (!playerRef.current) {
      playerRef.current = createBirthdayPlayer(() => setIsPlaying(false))
    }
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.stop()
      setIsPlaying(false)
    } else {
      await startMusic()
    }
  }

  return (
    <main>
      <Confetti active={confetti} />
      {!opened ? (
        <GiftIntro onOpen={openGift} opening={opening} />
      ) : (
        <div className="birthday-page">
          <button className={`music-button ${isPlaying ? 'is-playing' : ''}`} onClick={toggleMusic} aria-pressed={isPlaying}>
            <span className="music-icon" aria-hidden="true">{isPlaying ? 'Ⅱ' : '♪'}</span>
            <span>{isPlaying ? 'وقّفي اللحن' : 'شغّلي اللحن'}</span>
          </button>
          <Hero />
          <div className="torn-divider" aria-hidden="true" />
          <Album onSelect={setSelectedPhoto} />
          <Moments />
          <Letter />
          <Cake />
          <footer>اتعملت مخصوص لبوبا ♡</footer>
        </div>
      )}
      <Lightbox selected={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </main>
  )
}
