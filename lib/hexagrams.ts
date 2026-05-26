/**
 * The 64 Hexagrams of the I Ching (Book of Changes), King Wen sequence.
 *
 * Interpretations draw on the traditional Wilhelm-Baynes translation and
 * the canonical Tuan and Xiang commentaries. Text is condensed to a single
 * reflective passage suitable for divinatory reading.
 *
 * Trigram encoding (3 bits, line 1 = bottom = LSB; Yang=1, Yin=0):
 *   7 ☰ Qián  (Heaven)     1 ☳ Zhèn (Thunder)
 *   3 ☱ Duì   (Lake)       6 ☴ Xùn  (Wind)
 *   5 ☲ Lí    (Fire)       2 ☵ Kǎn  (Water)
 *   4 ☶ Gèn   (Mountain)   0 ☷ Kūn  (Earth)
 *
 * A hexagram's 6-bit value is: (upper << 3) | lower
 * where line 1 (bottom) is the least-significant bit.
 */

export type LineValue = 0 | 1; // 0 = Yin (broken), 1 = Yang (solid)

export interface Hexagram {
  kingWen: number;        // 1..64
  name: string;           // English
  chinese: string;        // Traditional Chinese
  pinyin: string;         // With tone marks
  upper: number;          // upper trigram (0..7)
  lower: number;          // lower trigram (0..7)
  judgment: string;       // Tuan — the core oracle
  image: string;          // Xiang — symbolic image and lesson
  interpretation: string; // Reading for the seeker
}

const H: Hexagram[] = [
  {
    kingWen: 1, name: 'The Creative', chinese: '乾', pinyin: 'Qián',
    upper: 7, lower: 7,
    judgment: 'The Creative works sublime success, furthering through perseverance.',
    image: 'The movement of heaven is full of power. Thus the superior one makes themselves strong and untiring.',
    interpretation: 'Pure creative force, undivided and rising. This is a moment when initiative is rewarded and clarity of purpose carries you upward. The energy is heavenly — masculine, generative, unstoppable when aligned with what is right. Act decisively but not recklessly. Greatness is available, but only through sustained, principled effort. Do not exhaust yourself trying to control the timing; the dragon hidden in the deep eventually flies in the heavens.',
  },
  {
    kingWen: 2, name: 'The Receptive', chinese: '坤', pinyin: 'Kūn',
    upper: 0, lower: 0,
    judgment: 'The Receptive brings sublime success, furthering through the perseverance of a mare.',
    image: 'The earth\'s condition is receptive devotion. Thus the superior one who has breadth of character carries the outer world.',
    interpretation: 'Pure receptive force — yielding, spacious, fertile. This is a time to follow rather than lead, to support rather than initiate. The earth completes what heaven begins. Do not try to set the direction; instead, give substance and form to what is already in motion. Receptive does not mean passive: it means devoted, durable, and quietly carrying. Trust that your gentleness is strength.',
  },
  {
    kingWen: 3, name: 'Difficulty at the Beginning', chinese: '屯', pinyin: 'Zhūn',
    upper: 2, lower: 1,
    judgment: 'Sublime success through perseverance. Do not act. Seek helpers.',
    image: 'Clouds and thunder: the image of Difficulty at the Beginning. Thus the superior one brings order out of confusion.',
    interpretation: 'The blade of grass pushing through hard soil. Beginnings are difficult, and forcing them is a mistake. Do not strike out alone — seek allies and accept that growth here is slow. Order is emerging from chaos, but only if you keep your footing. What feels stuck is in fact gathering strength. Persevere quietly; the breakthrough belongs to those who do not abandon the work.',
  },
  {
    kingWen: 4, name: 'Youthful Folly', chinese: '蒙', pinyin: 'Méng',
    upper: 4, lower: 2,
    judgment: 'Success. It is not I who seek the young fool; the young fool seeks me.',
    image: 'A spring wells up at the foot of the mountain: the image of Youthful Folly. Thus the superior one fosters their character by thoroughness in all that they do.',
    interpretation: 'Inexperience meets a difficult terrain. The lesson is humility: ask sincerely, listen carefully, and accept correction without resentment. A teacher who is pestered repeatedly will eventually fall silent. Approach what you do not yet understand with fresh attention, not bravado. Folly turns to wisdom through patient practice, not through clever shortcuts.',
  },
  {
    kingWen: 5, name: 'Waiting', chinese: '需', pinyin: 'Xū',
    upper: 2, lower: 7,
    judgment: 'If you are sincere, you have light and success. Perseverance brings good fortune. It furthers one to cross the great water.',
    image: 'Clouds rise up to heaven: the image of Waiting. Thus the superior one eats and drinks, is joyous and of good cheer.',
    interpretation: 'The rain is coming, but it has not yet arrived. Forcing the issue now produces nothing; the right move is to wait — not idly, but with strength and good humor. Nourish yourself. Keep your inner light clear. Sincerity is the substance that makes waiting fruitful rather than wasted. When the moment ripens, you will cross the great water with ease.',
  },
  {
    kingWen: 6, name: 'Conflict', chinese: '訟', pinyin: 'Sòng',
    upper: 7, lower: 2,
    judgment: 'You are sincere and are being obstructed. A cautious halt halfway brings good fortune. Going through to the end brings misfortune.',
    image: 'Heaven and water go their opposite ways: the image of Conflict. Thus in all transactions the superior one considers the beginning.',
    interpretation: 'Two forces are pulling in opposite directions. You may be right, but pressing the conflict to its end will damage you more than the loss you are trying to avoid. Step back. Seek a neutral arbiter or simply walk away from the field. The wise prevent conflicts at the start by structuring their commitments carefully; once the dispute is mature, retreat is wiser than victory.',
  },
  {
    kingWen: 7, name: 'The Army', chinese: '師', pinyin: 'Shī',
    upper: 0, lower: 2,
    judgment: 'The army needs perseverance and a strong leader. Good fortune without blame.',
    image: 'In the middle of the earth is water: the image of The Army. Thus the superior one increases their masses by generosity toward the people.',
    interpretation: 'A coordinated effort requires discipline and a leader people trust. Power exercised without justice corrupts the cause; power exercised with restraint binds the group together. Whatever you are mobilizing — a team, a campaign, your own inner forces — clarify the chain of command and the moral basis of the action. Strength held in reserve is more persuasive than strength constantly displayed.',
  },
  {
    kingWen: 8, name: 'Holding Together', chinese: '比', pinyin: 'Bǐ',
    upper: 2, lower: 0,
    judgment: 'Good fortune. Inquire of the oracle once again whether you possess sublimity, constancy, and perseverance; then there is no blame.',
    image: 'On the earth is water: the image of Holding Together. Thus the kings of antiquity bestowed the different states as fiefs and cultivated friendly relations with their lords.',
    interpretation: 'A center is forming around which others wish to gather. Whether you are the center or you are choosing whom to follow, sincerity is the test. Late-comers find no place; act now while the union is being formed. Bonds built on convenience dissolve under pressure — only bonds built on character endure. Examine your motives before you commit.',
  },
  {
    kingWen: 9, name: 'Small Taming', chinese: '小畜', pinyin: 'Xiǎo Xù',
    upper: 6, lower: 7,
    judgment: 'Success. Dense clouds, no rain from our western region.',
    image: 'The wind drives across heaven: the image of Small Taming. Thus the superior one refines the outward aspect of their nature.',
    interpretation: 'A small obstacle restrains a great force. The conditions for breakthrough are not yet ripe — the clouds gather but the rain has not come. Use this interlude for refinement. Polish your manner, sharpen your details, attend to surfaces. What cannot be advanced now can still be made beautiful. The wind will carry you when its time comes.',
  },
  {
    kingWen: 10, name: 'Treading', chinese: '履', pinyin: 'Lǚ',
    upper: 7, lower: 3,
    judgment: 'Treading on the tail of the tiger. It does not bite. Success.',
    image: 'Heaven above, the lake below: the image of Treading. Thus the superior one discriminates between high and low, and thereby fortifies the thinking of the people.',
    interpretation: 'You are moving through a situation where a single careless step would invite disaster — yet, if you walk with respect and clear awareness, no harm comes. Do not provoke power, but do not cower before it either. Right conduct in the presence of danger is what defines a person. Mind your bearing; the tiger reads it before it reads your words.',
  },
  {
    kingWen: 11, name: 'Peace', chinese: '泰', pinyin: 'Tài',
    upper: 0, lower: 7,
    judgment: 'The small departs, the great approaches. Good fortune. Success.',
    image: 'Heaven and earth unite: the image of Peace. Thus the ruler divides and completes the course of heaven and earth.',
    interpretation: 'Heaven and earth are in communion; the small recedes and the great advances. This is a generous, prosperous moment, but precisely the time to remember that peace contains its opposite. Strengthen what is good while conditions favor you. Build the storehouse before the lean year. The mature response to abundance is not consumption but stewardship.',
  },
  {
    kingWen: 12, name: 'Standstill', chinese: '否', pinyin: 'Pǐ',
    upper: 7, lower: 0,
    judgment: 'Standstill. Evil people do not further the perseverance of the superior one. The great departs, the small approaches.',
    image: 'Heaven and earth do not unite: the image of Standstill. Thus the superior one falls back upon their inner worth in order to escape the difficulties.',
    interpretation: 'The channels of communication have closed. What used to flow no longer does, and pushing harder will not reopen them. Withdraw to your inner life; do not seek visibility or influence now. This is a season for integrity practiced quietly. Standstill is not permanent — but acting as if it weren\'t happening only deepens the obstruction.',
  },
  {
    kingWen: 13, name: 'Fellowship', chinese: '同人', pinyin: 'Tóng Rén',
    upper: 7, lower: 5,
    judgment: 'Fellowship with people in the open. Success. It furthers one to cross the great water. The perseverance of the superior one furthers.',
    image: 'Heaven together with fire: the image of Fellowship. Thus the superior one organizes the clans and makes distinctions between things.',
    interpretation: 'True community is built in the open, on shared principles, not in secret cliques bound by private interest. The fellowship that endures distinguishes between things clearly — it does not pretend that all are equally aligned. Find your people in the daylight. With them, the great water can be crossed.',
  },
  {
    kingWen: 14, name: 'Great Possession', chinese: '大有', pinyin: 'Dà Yǒu',
    upper: 5, lower: 7,
    judgment: 'Supreme success.',
    image: 'Fire in heaven above: the image of Great Possession. Thus the superior one curbs evil and furthers good, obeying the benevolent will of heaven.',
    interpretation: 'Great wealth, great influence, great resources — and with them, great responsibility. Possession is dangerous only when it makes the possessor arrogant or careless. Use what has been entrusted to you to curb evil and further good. The fire in heaven shines on everything; nothing you do now is private. Carry the gift with humility.',
  },
  {
    kingWen: 15, name: 'Modesty', chinese: '謙', pinyin: 'Qiān',
    upper: 0, lower: 4,
    judgment: 'Success. The superior one carries things through.',
    image: 'Within the earth, a mountain: the image of Modesty. Thus the superior one reduces what is too much and augments what is too little.',
    interpretation: 'The mountain hidden inside the earth — great substance that does not insist on being seen. Modesty is not self-deprecation; it is accurate self-knowledge that does not need external confirmation. This is one of the only hexagrams whose lines are all favorable. Whatever you undertake now, do it without display, and it will be carried through.',
  },
  {
    kingWen: 16, name: 'Enthusiasm', chinese: '豫', pinyin: 'Yù',
    upper: 1, lower: 0,
    judgment: 'It furthers one to install helpers and to set armies marching.',
    image: 'Thunder comes resounding out of the earth: the image of Enthusiasm. Thus the ancient kings made music in order to honor merit.',
    interpretation: 'A wave of energy is rising and others want to join it. This is the time to organize, delegate, and let momentum do its work. Music, ritual, shared rhythm — these are how enthusiasm becomes a movement rather than a flash. Beware self-intoxication; enthusiasm that loses touch with reality crashes hardest.',
  },
  {
    kingWen: 17, name: 'Following', chinese: '隨', pinyin: 'Suí',
    upper: 3, lower: 1,
    judgment: 'Supreme success. Perseverance furthers. No blame.',
    image: 'Thunder in the middle of the lake: the image of Following. Thus the superior one at nightfall goes indoors for rest and recuperation.',
    interpretation: 'To lead, one must first know how to follow — the moment, the people, the truth of the situation. Adapt without losing your center. Rest when the day is done; you will not bring tomorrow forward by skipping the night. What you align with now sets the pattern for what aligns with you later.',
  },
  {
    kingWen: 18, name: 'Work on the Decayed', chinese: '蠱', pinyin: 'Gǔ',
    upper: 4, lower: 6,
    judgment: 'Supreme success. It furthers one to cross the great water. Before the starting point, three days. After the starting point, three days.',
    image: 'The wind blows low on the mountain: the image of Decay. Thus the superior one stirs up the people and strengthens their spirit.',
    interpretation: 'Something inherited has gone to rot — a habit, a structure, a story you were handed. Repair work is the task. Examine the cause carefully (three days before), make the change, then watch the consequences carefully (three days after). Decay reversed is renewal; decay ignored becomes ruin.',
  },
  {
    kingWen: 19, name: 'Approach', chinese: '臨', pinyin: 'Lín',
    upper: 0, lower: 3,
    judgment: 'Supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.',
    image: 'The earth above the lake: the image of Approach. Thus the superior one is inexhaustible in their will to teach, and without limits in their tolerance and protection of the people.',
    interpretation: 'A favorable season is opening. Advance generously, but remember that every spring eventually meets its autumn. Do the work that this season makes possible — the next will not. Teach freely, protect without limit, and do not waste the warmth.',
  },
  {
    kingWen: 20, name: 'Contemplation', chinese: '觀', pinyin: 'Guān',
    upper: 6, lower: 0,
    judgment: 'The ablution has been made, but not yet the offering. Full of trust they look up.',
    image: 'The wind blows over the earth: the image of Contemplation. Thus the kings of old visited the regions of the world, contemplated the people, and gave them instruction.',
    interpretation: 'The moment between preparation and action. Look — really look — at what is in front of you. Be looked at, also, with full awareness that your bearing teaches more than your words. This is a time for vision and observation, not yet for moves. The deeper you see now, the truer your eventual action.',
  },
  {
    kingWen: 21, name: 'Biting Through', chinese: '噬嗑', pinyin: 'Shì Kè',
    upper: 5, lower: 1,
    judgment: 'Success. It is favorable to let justice be administered.',
    image: 'Thunder and lightning: the image of Biting Through. Thus the kings of former times made firm the laws through clearly defined penalties.',
    interpretation: 'An obstruction must be removed by decisive action. Half-measures and politeness will not work here; the situation calls for a clean bite through what is in the way. Where there is wrongdoing, name it. Where there is ambiguity, set the boundary. Justice administered swiftly clarifies the field for everyone.',
  },
  {
    kingWen: 22, name: 'Grace', chinese: '賁', pinyin: 'Bì',
    upper: 4, lower: 5,
    judgment: 'Success. In small matters it is favorable to undertake something.',
    image: 'Fire at the foot of the mountain: the image of Grace. Thus does the superior one proceed when clearing up current affairs, but does not decide controversial issues this way.',
    interpretation: 'Beauty, form, and grace are appropriate for ordinary affairs but cannot resolve substantive disputes. Adornment serves life; it does not replace it. Attend to how things look and feel — manners matter — but if a real decision is at stake, set aesthetics aside and consult substance.',
  },
  {
    kingWen: 23, name: 'Splitting Apart', chinese: '剝', pinyin: 'Bō',
    upper: 4, lower: 0,
    judgment: 'It does not further one to go anywhere.',
    image: 'The mountain rests on the earth: the image of Splitting Apart. Thus those above can ensure their position only by giving generously to those below.',
    interpretation: 'The structure is being eroded from below. Resistance is not the answer — the time itself is against you. Be still. Give generously where you can, do not pretend the decay isn\'t happening, and wait for the cycle to turn. What looks like collapse contains the seed of return.',
  },
  {
    kingWen: 24, name: 'Return', chinese: '復', pinyin: 'Fù',
    upper: 0, lower: 1,
    judgment: 'Success. Going out and coming in without error. Friends come without blame.',
    image: 'Thunder within the earth: the image of the Turning Point. Thus the kings of antiquity closed the passes at the time of solstice.',
    interpretation: 'The turning point. After a long descent, the light returns — quietly, deep below the surface. Do not over-extend in the first burst of recovery. Honor the small return by guarding it carefully, the way the ancients closed the passes at solstice to let the new energy gather strength.',
  },
  {
    kingWen: 25, name: 'Innocence', chinese: '無妄', pinyin: 'Wú Wàng',
    upper: 7, lower: 1,
    judgment: 'Supreme success. Perseverance furthers. If someone is not as they should be, they have misfortune.',
    image: 'Under heaven, thunder rolls: the image of Innocence. Thus the kings of old, rich in virtue, fostered all beings in harmony with the time.',
    interpretation: 'Act from your unconditioned nature — without calculation, without hidden agenda. What you do in this state succeeds because it is in tune with the time. The corruption to fear here is internal: secondary motives, anxious cleverness. Drop them and proceed with a clear heart.',
  },
  {
    kingWen: 26, name: 'Great Taming', chinese: '大畜', pinyin: 'Dà Xù',
    upper: 4, lower: 7,
    judgment: 'Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.',
    image: 'Heaven within the mountain: the image of Great Taming. Thus the superior one acquaints themselves with many sayings of antiquity and many deeds of the past, in order to strengthen their character thereby.',
    interpretation: 'Great creative force held in reserve, refined by study and discipline. This is not a time to consume what you have at home but to engage with the wider world. Knowledge accumulated quietly becomes power released wisely. Cross the great water — your preparation has earned the journey.',
  },
  {
    kingWen: 27, name: 'The Corners of the Mouth', chinese: '頤', pinyin: 'Yí',
    upper: 4, lower: 1,
    judgment: 'Perseverance brings good fortune. Pay heed to providing nourishment and to what a person seeks to fill their own mouth with.',
    image: 'At the foot of the mountain, thunder: the image of Providing Nourishment. Thus the superior one is careful of their words and temperate in eating and drinking.',
    interpretation: 'What you take in — food, words, ideas, companions — becomes you. What you give out matters even more. Watch the corners of your mouth: are they speaking life or poison, consuming sustenance or junk? Nourishment is a moral question, not just a physical one.',
  },
  {
    kingWen: 28, name: 'Great Preponderance', chinese: '大過', pinyin: 'Dà Guò',
    upper: 3, lower: 6,
    judgment: 'The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.',
    image: 'The lake rises above the trees: the image of Great Preponderance. Thus the superior one, when standing alone, is unconcerned, and if they have to renounce the world, they are undaunted.',
    interpretation: 'The structure is overloaded. The weight at the top has grown too great for what supports it. Extraordinary times require extraordinary courage — including the courage to stand alone, to renounce, to walk away from arrangements that cannot bear the load. Find somewhere to go.',
  },
  {
    kingWen: 29, name: 'The Abysmal', chinese: '坎', pinyin: 'Kǎn',
    upper: 2, lower: 2,
    judgment: 'If you are sincere, you have success in your heart, and whatever you do succeeds.',
    image: 'Water flows on uninterruptedly and reaches its goal: the image of the Abysmal repeated. Thus the superior one walks in lasting virtue and carries on the business of teaching.',
    interpretation: 'Danger upon danger. Water in the gorge does not stop — it flows around obstacles, fills the hollows, and continues. Sincerity is what keeps you afloat here. Do not try to leap out of the situation; flow through it. Repeated difficulty teaches what comfort cannot.',
  },
  {
    kingWen: 30, name: 'The Clinging Fire', chinese: '離', pinyin: 'Lí',
    upper: 5, lower: 5,
    judgment: 'Perseverance furthers. It brings success. Care of the cow brings good fortune.',
    image: 'That which is bright rises twice: the image of Fire. Thus the great one, by perpetuating this brightness, illumines the four quarters of the world.',
    interpretation: 'Fire clings to wood; clarity depends on what it rests upon. Brilliance without humility burns itself out. Care for the docile cow — the patient base that lets your light burn steadily. What you cling to determines whether you illuminate the world or consume yourself.',
  },
  {
    kingWen: 31, name: 'Influence (Wooing)', chinese: '咸', pinyin: 'Xián',
    upper: 3, lower: 4,
    judgment: 'Success. Perseverance furthers. To take a maiden to wife brings good fortune.',
    image: 'A lake on the mountain: the image of Influence. Thus the superior one encourages people to approach them by their readiness to receive them.',
    interpretation: 'Attraction without manipulation — mutual influence between two whose openness invites each other. In all relations now, be the one who receives well. Coercion produces compliance, not communion. The lake on the mountain offers itself to whatever comes; this is its power.',
  },
  {
    kingWen: 32, name: 'Duration', chinese: '恆', pinyin: 'Héng',
    upper: 1, lower: 6,
    judgment: 'Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.',
    image: 'Thunder and wind: the image of Duration. Thus the superior one stands firm and does not change direction.',
    interpretation: 'Endurance comes not from rigidity but from constancy of direction. Thunder and wind keep moving — that is how they last. Stand firm in your bearing, but do not freeze in your tactics. What endures, endures by adapting around an unchanging core.',
  },
  {
    kingWen: 33, name: 'Retreat', chinese: '遯', pinyin: 'Dùn',
    upper: 7, lower: 4,
    judgment: 'Retreat. Success. In what is small, perseverance furthers.',
    image: 'Mountain under heaven: the image of Retreat. Thus the superior one keeps the inferior person at a distance, not angrily but with reserve.',
    interpretation: 'Withdraw with dignity. Retreat is not defeat when it is done at the right moment and with full possession of yourself. Hold to small disciplines while the larger field is unfavorable. Distance, not confrontation, is the right tool here.',
  },
  {
    kingWen: 34, name: 'The Power of the Great', chinese: '大壯', pinyin: 'Dà Zhuàng',
    upper: 1, lower: 7,
    judgment: 'Perseverance furthers.',
    image: 'Thunder in heaven above: the image of the Power of the Great. Thus the superior one does not tread upon paths that do not accord with established order.',
    interpretation: 'Great power has accumulated. The danger is using it carelessly. A force this strong, channeled through wrong paths, destroys its possessor. Walk only on paths that accord with right order — strength is most impressive when it does not need to display itself.',
  },
  {
    kingWen: 35, name: 'Progress', chinese: '晉', pinyin: 'Jìn',
    upper: 5, lower: 0,
    judgment: 'The powerful prince is honored with horses in large numbers. In a single day they are granted audience three times.',
    image: 'The sun rises over the earth: the image of Progress. Thus the superior one brightens their bright virtue.',
    interpretation: 'Rapid, visible advancement. Recognition is coming, perhaps faster than expected. The right response to ascent is to brighten what is bright in you — your virtues, your gifts — not to clutch the rewards. Let the rising sun show you for what you are.',
  },
  {
    kingWen: 36, name: 'Darkening of the Light', chinese: '明夷', pinyin: 'Míng Yí',
    upper: 0, lower: 5,
    judgment: 'In adversity it furthers one to be persevering.',
    image: 'The light has sunk into the earth: the image of the Darkening of the Light. Thus the superior one lives with the great mass: they veil their light, yet still shine.',
    interpretation: 'A dark time — your gifts may not be welcomed, your clarity may be punished. Veil the light. Live among people, work in your craft, but do not parade what would be misunderstood. The inner brightness is preserved by outer dimming. This too will pass.',
  },
  {
    kingWen: 37, name: 'The Family', chinese: '家人', pinyin: 'Jiā Rén',
    upper: 6, lower: 5,
    judgment: 'The perseverance of the woman furthers.',
    image: 'Wind comes forth from fire: the image of the Family. Thus the superior one has substance in their words and duration in their way of life.',
    interpretation: 'The health of any group flows from the integrity of its roles. Each in their place, each with substance behind their words — this is how a household, a team, a community holds together. Affection without structure dissolves; structure without affection hardens. Both are needed.',
  },
  {
    kingWen: 38, name: 'Opposition', chinese: '睽', pinyin: 'Kuí',
    upper: 5, lower: 3,
    judgment: 'In small matters, good fortune.',
    image: 'Above, fire; below, the lake: the image of Opposition. Thus, amid all fellowship, the superior one retains their individuality.',
    interpretation: 'Two who seemed aligned find themselves looking opposite ways. Do not try to force agreement on large matters now. In small, daily exchanges, good will is enough. Keep your individuality intact — opposition rightly understood preserves difference rather than collapsing it.',
  },
  {
    kingWen: 39, name: 'Obstruction', chinese: '蹇', pinyin: 'Jiǎn',
    upper: 2, lower: 4,
    judgment: 'The southwest furthers. The northeast does not further. It furthers one to see the great person. Perseverance brings good fortune.',
    image: 'Water on the mountain: the image of Obstruction. Thus the superior one turns their attention to themselves and molds their character.',
    interpretation: 'The path is blocked. The wise response is not to ram through but to turn inward. Whatever is obstructing the outer way is a teacher pointing you toward inner work. Seek counsel from someone wiser than you. The route that opens later will be one your character must be ready for.',
  },
  {
    kingWen: 40, name: 'Deliverance', chinese: '解', pinyin: 'Xiè',
    upper: 1, lower: 2,
    judgment: 'The southwest furthers. If there is no longer anything where one has to go, return brings good fortune. If there is still something where one has to go, hastening brings good fortune.',
    image: 'Thunder and rain set in: the image of Deliverance. Thus the superior one pardons mistakes and forgives misdeeds.',
    interpretation: 'A tension breaks; the storm clears the air. Once relief has come, do not linger in the posture of struggle. If there is still work to do, do it quickly while the way is open. Forgive — both others and yourself — and move on lighter than before.',
  },
  {
    kingWen: 41, name: 'Decrease', chinese: '損', pinyin: 'Sǔn',
    upper: 4, lower: 3,
    judgment: 'Decrease combined with sincerity brings about supreme good fortune.',
    image: 'At the foot of the mountain, the lake: the image of Decrease. Thus the superior one controls their anger and restrains their instincts.',
    interpretation: 'Voluntary simplification. What you give up sincerely returns multiplied; what you cling to anxiously erodes anyway. Control the reactive instincts that drain you. Less, chosen well, becomes more.',
  },
  {
    kingWen: 42, name: 'Increase', chinese: '益', pinyin: 'Yì',
    upper: 6, lower: 1,
    judgment: 'It furthers one to undertake something. It furthers one to cross the great water.',
    image: 'Wind and thunder: the image of Increase. Thus the superior one: if they see good, they imitate it; if they have faults, they rid themselves of them.',
    interpretation: 'A favorable expansion — but increase that is hoarded turns toxic. The right use of gain is to extend it outward, to share, to invest in what grows further. Imitate good wherever you see it; abandon faults the moment you spot them. Movement is the rule of this hexagram.',
  },
  {
    kingWen: 43, name: 'Breakthrough', chinese: '夬', pinyin: 'Guài',
    upper: 3, lower: 7,
    judgment: 'One must resolutely make the matter known at the court of the king. It must be announced truthfully. Danger. It is necessary to notify one\'s own city.',
    image: 'The lake has risen up to heaven: the image of Breakthrough. Thus the superior one dispenses riches downward and refrains from resting on their virtue.',
    interpretation: 'A decisive moment. What has been hidden must now be named openly — but in the right forum, in the right way. Force without truthfulness backfires. Acknowledge the danger of speaking, and speak anyway. Share what you have; do not rest on the virtue of having shared once.',
  },
  {
    kingWen: 44, name: 'Coming to Meet', chinese: '姤', pinyin: 'Gòu',
    upper: 7, lower: 6,
    judgment: 'The maiden is powerful. One should not marry such a maiden.',
    image: 'Under heaven, wind: the image of Coming to Meet. Thus does the prince act when disseminating their commands and proclaiming them to the four quarters of heaven.',
    interpretation: 'Something seemingly small has appeared and wants to grow. The temptation is to dismiss it as unimportant; that is precisely how small things become unmanageable. Acknowledge what is arriving. Do not bind yourself to it carelessly. Set the terms now while you still can.',
  },
  {
    kingWen: 45, name: 'Gathering Together', chinese: '萃', pinyin: 'Cuì',
    upper: 3, lower: 0,
    judgment: 'Success. The king approaches their temple. It furthers one to see the great person.',
    image: 'Over the earth, the lake: the image of Gathering Together. Thus the superior one renews their weapons in order to meet the unforeseen.',
    interpretation: 'People are coming together around a shared center. Such gatherings are powerful and dangerous in equal measure — they need a credible leader and ceremonial honesty. Renew your tools now; concentrated groups attract concentrated risks. What unifies you also makes you a target.',
  },
  {
    kingWen: 46, name: 'Pushing Upward', chinese: '升', pinyin: 'Shēng',
    upper: 0, lower: 6,
    judgment: 'Pushing upward has supreme success. One must see the great person. Fear not. Departure toward the south brings good fortune.',
    image: 'Within the earth, wood grows: the image of Pushing Upward. Thus the superior one of devoted character heaps up small things in order to achieve something high and great.',
    interpretation: 'Slow, steady ascent. The tree grows by countless tiny additions, none of which seem dramatic. This is the rhythm to adopt. Do not seek the spectacular leap; trust the cumulative work. Fear not — your direction is sound and the way is open.',
  },
  {
    kingWen: 47, name: 'Oppression (Exhaustion)', chinese: '困', pinyin: 'Kùn',
    upper: 3, lower: 2,
    judgment: 'Success. Perseverance. The great person brings good fortune. No blame. When one has something to say, it is not believed.',
    image: 'There is no water in the lake: the image of Exhaustion. Thus the superior one stakes their life on following their will.',
    interpretation: 'A time of constraint and unrecognized worth. Words now will not be heard; protesting only deepens the exhaustion. What is left is the inner choice to remain true. Stake your life on your will, quietly. The lake will fill again, but on its own schedule, not yours.',
  },
  {
    kingWen: 48, name: 'The Well', chinese: '井', pinyin: 'Jǐng',
    upper: 2, lower: 6,
    judgment: 'The town may be changed, but the well cannot be changed. It neither decreases nor increases.',
    image: 'Water over wood: the image of the Well. Thus the superior one encourages the people at their work, and exhorts them to help one another.',
    interpretation: 'Certain sources of nourishment are permanent — values, friendships, deep practices. Towns rise and fall around them; the well remains. Make sure your well is clean and that its rope is long enough to reach the water. What you depend on, others depend on too.',
  },
  {
    kingWen: 49, name: 'Revolution', chinese: '革', pinyin: 'Gé',
    upper: 3, lower: 5,
    judgment: 'On your own day you are believed. Supreme success, furthering through perseverance. Remorse disappears.',
    image: 'Fire in the lake: the image of Revolution. Thus the superior one sets the calendar in order and makes the seasons clear.',
    interpretation: 'A change has become necessary and the conditions are ripe. Revolution is not a tantrum — it is a reordering, like resetting the calendar. Wait for the right day; then act, and your action will be believed. Half-measures here invite more remorse than full ones.',
  },
  {
    kingWen: 50, name: 'The Cauldron', chinese: '鼎', pinyin: 'Dǐng',
    upper: 5, lower: 6,
    judgment: 'Supreme good fortune. Success.',
    image: 'Fire over wood: the image of the Cauldron. Thus the superior one consolidates their fate by making their position correct.',
    interpretation: 'The vessel of transformation. Raw ingredients become nourishment through fire and form. Your circumstances are the cauldron; what you do inside them is the cooking. Make your position correct — accurate, principled, properly placed — and the result will feed many.',
  },
  {
    kingWen: 51, name: 'The Arousing (Thunder)', chinese: '震', pinyin: 'Zhèn',
    upper: 1, lower: 1,
    judgment: 'Success. Shock comes — oh, oh! Laughing words — ha, ha! The shock terrifies for a hundred miles, and they do not let fall the sacrificial spoon and chalice.',
    image: 'Thunder repeated: the image of the Arousing. Thus the superior one is fearful and apprehensive, sets their life in order, and examines themselves.',
    interpretation: 'A shock arrives. The wise response is not to panic — the sacrificial vessels stay in your hands — but to use the jolt to reorder yourself. Shock that is not used for self-examination passes as noise; shock that is used becomes the turning point of a life.',
  },
  {
    kingWen: 52, name: 'Keeping Still (Mountain)', chinese: '艮', pinyin: 'Gèn',
    upper: 4, lower: 4,
    judgment: 'Keeping their back still so that they no longer feel their body. They go into their courtyard and do not see their people. No blame.',
    image: 'Mountains standing close together: the image of Keeping Still. Thus the superior one does not permit their thoughts to go beyond their situation.',
    interpretation: 'Genuine stillness — not suppression, but the absence of grasping. Quiet the back, and the front quiets too. The thoughts that race ahead of your situation create your suffering. Stay where you are, fully. Stillness reached this way is unshakeable.',
  },
  {
    kingWen: 53, name: 'Development (Gradual Progress)', chinese: '漸', pinyin: 'Jiàn',
    upper: 6, lower: 4,
    judgment: 'The maiden is given in marriage. Good fortune. Perseverance furthers.',
    image: 'On the mountain, a tree: the image of Development. Thus the superior one abides in dignity and virtue, in order to improve the customs.',
    interpretation: 'Growth that honors the proper sequence. Each stage is fully entered before the next begins. Shortcuts here produce stunted results. Abide in dignity, take the steps in order, and what develops will be deeply rooted enough to last.',
  },
  {
    kingWen: 54, name: 'The Marrying Maiden', chinese: '歸妹', pinyin: 'Guī Mèi',
    upper: 1, lower: 3,
    judgment: 'Undertakings bring misfortune. Nothing that would further.',
    image: 'Thunder over the lake: the image of the Marrying Maiden. Thus the superior one understands the transitory in the light of the eternity of the end.',
    interpretation: 'An arrangement entered from impulse rather than principle. Such things rarely end well — but they happen, and the seeker who finds themselves inside one should not pretend otherwise. Hold the transitory situation against the larger pattern of your life. Do not let a passing storm rewrite your direction.',
  },
  {
    kingWen: 55, name: 'Abundance', chinese: '豐', pinyin: 'Fēng',
    upper: 1, lower: 5,
    judgment: 'Abundance has success. The king attains abundance. Be not sad. Be like the sun at midday.',
    image: 'Both thunder and lightning come: the image of Abundance. Thus the superior one decides lawsuits and carries out punishments.',
    interpretation: 'The peak. The sun at noon casts the shortest shadow — and begins to descend immediately. Enjoy the abundance without sadness about its impermanence, but use the clarity of full light to set things in order while you can see them most clearly.',
  },
  {
    kingWen: 56, name: 'The Wanderer', chinese: '旅', pinyin: 'Lǚ',
    upper: 5, lower: 4,
    judgment: 'The Wanderer. Success through smallness. Perseverance brings good fortune to the wanderer.',
    image: 'Fire on the mountain: the image of the Wanderer. Thus the superior one is clear-minded and cautious in imposing penalties, and protracts no lawsuits.',
    interpretation: 'You are passing through. Travelers cannot afford the indulgences of those at home — no grand gestures, no long disputes. Stay small, courteous, alert. Travel teaches what staying never could, but only if the wanderer keeps their wits and does not mistake the inn for the destination.',
  },
  {
    kingWen: 57, name: 'The Gentle (Wind)', chinese: '巽', pinyin: 'Xùn',
    upper: 6, lower: 6,
    judgment: 'Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great person.',
    image: 'Winds following one upon the other: the image of the Gently Penetrating. Thus the superior one spreads their commands abroad and carries out their undertakings.',
    interpretation: 'The wind reaches everywhere by being soft enough to pass through every gap. Repetition, gentleness, and patient influence accomplish what force cannot. Make your message clear and let it travel; the right ears will catch it.',
  },
  {
    kingWen: 58, name: 'The Joyous (Lake)', chinese: '兌', pinyin: 'Duì',
    upper: 3, lower: 3,
    judgment: 'Success. Perseverance is favorable.',
    image: 'Lakes resting one on the other: the image of the Joyous. Thus the superior one joins with friends for discussion and practice.',
    interpretation: 'Open, honest joy — the kind that strengthens those around it. Surface cheerfulness depletes; real joy multiplies. Find friends with whom you can both discuss and practice — speech without practice goes nowhere, practice without speech becomes lonely.',
  },
  {
    kingWen: 59, name: 'Dispersion', chinese: '渙', pinyin: 'Huàn',
    upper: 6, lower: 2,
    judgment: 'Success. The king approaches their temple. It furthers one to cross the great water. Perseverance furthers.',
    image: 'The wind drives over the water: the image of Dispersion. Thus the kings of old sacrificed to the Lord and built temples.',
    interpretation: 'A hardness dissolves. What was frozen — between people, inside you — breaks up and becomes mobile again. Use the moment to reach what could not be reached before. Sacred ceremony, shared work, sincere acknowledgment: any of these can carry you across the great water now.',
  },
  {
    kingWen: 60, name: 'Limitation', chinese: '節', pinyin: 'Jié',
    upper: 2, lower: 3,
    judgment: 'Success. Galling limitation must not be persevered in.',
    image: 'Water over lake: the image of Limitation. Thus the superior one creates number and measure, and examines the nature of virtue and correct conduct.',
    interpretation: 'Limits make possible what limitless options destroy. Choose your constraints consciously — but do not cling to constraints that have become cruel. Measure, number, structure: these are servants of life, not masters of it.',
  },
  {
    kingWen: 61, name: 'Inner Truth', chinese: '中孚', pinyin: 'Zhōng Fú',
    upper: 6, lower: 3,
    judgment: 'Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.',
    image: 'Wind over the lake: the image of Inner Truth. Thus the superior one discusses criminal cases in order to delay executions.',
    interpretation: 'Sincerity so deep that even pigs and fishes — the least responsive creatures — feel it. This is the rare moment when honesty truly reaches another. Use it to repair what cannot be repaired by force or argument. Do not rush judgments; let truth do its slow work.',
  },
  {
    kingWen: 62, name: 'Small Preponderance', chinese: '小過', pinyin: 'Xiǎo Guò',
    upper: 1, lower: 4,
    judgment: 'Success. Perseverance furthers. Small things may be done; great things should not be done. The flying bird brings the message: it is not well to strive upward, it is well to remain below. Great good fortune.',
    image: 'Thunder on the mountain: the image of Small Preponderance. Thus in their conduct the superior one gives preponderance to reverence.',
    interpretation: 'A time for modest action. Great undertakings now will fail; small, careful adjustments succeed. The flying bird should descend rather than climb. Lean toward reverence — in tone, in pace, in scale. Smallness, here, is wisdom.',
  },
  {
    kingWen: 63, name: 'After Completion', chinese: '既濟', pinyin: 'Jì Jì',
    upper: 2, lower: 5,
    judgment: 'Success in small matters. Perseverance furthers. At the beginning good fortune. At the end disorder.',
    image: 'Water over fire: the image of the condition After Completion. Thus the superior one takes thought of misfortune and arms themselves against it in advance.',
    interpretation: 'The task is done. Everything is in its place. Precisely now is when carelessness begins — completion is the start of decline if nothing new is being prepared. Take thought of misfortune while the field is calm. Arm yourself in advance.',
  },
  {
    kingWen: 64, name: 'Before Completion', chinese: '未濟', pinyin: 'Wèi Jì',
    upper: 5, lower: 2,
    judgment: 'Success. But if the little fox, after nearly completing the crossing, gets their tail in the water, there is nothing that would further.',
    image: 'Fire over water: the image of the condition Before Completion. Thus the superior one is careful in the differentiation of things, so that each finds its place.',
    interpretation: 'Almost there — and exactly at the moment when the crossing seems assured, the inexperienced relax and ruin everything. Stay careful all the way to dry land. The work of differentiation, of putting each thing in its proper place, is not finished until it is finished.',
  },
];

/**
 * Lookup table: 6-bit lines value (line 1 = LSB) → King Wen index (1..64).
 * Built once at module load from the hexagram definitions above.
 */
const BITS_TO_KING_WEN: number[] = (() => {
  const table = new Array<number>(64);
  for (const h of H) {
    const bits = (h.upper << 3) | h.lower;
    table[bits] = h.kingWen;
  }
  return table;
})();

/**
 * Convert the 6-bit `lines` value emitted by the BaseChing contract into the
 * corresponding hexagram entry. Bit 0 is line 1 (bottom), bit 5 is line 6 (top).
 */
export function hexagramFromLines(lines: number): Hexagram {
  const bits = lines & 0x3F;
  const kingWen = BITS_TO_KING_WEN[bits];
  return H[kingWen - 1];
}

/** Return the 6 individual line values (bottom to top). */
export function linesToArray(lines: number): LineValue[] {
  const out: LineValue[] = [];
  for (let i = 0; i < 6; i++) {
    out.push(((lines >> i) & 1) as LineValue);
  }
  return out;
}

/** All 64 hexagrams in King Wen order. */
export const HEXAGRAMS = H;
