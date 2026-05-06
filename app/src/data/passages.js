// Original ACT-style passages. ~325 words each. Underlined portions are wrapped
// inline using [Qn]...[/Qn] markers so the question card can highlight them.
// Question IDs map to passage marker numbers via: (passageNum-1)*15 + questionNum.
// e.g. p2q01 → Q16, p3q05 → Q35.

export const PASSAGES = [
  {
    id: 'p1',
    title: 'The Lighthouse Keeper of Tillamook Rock',
    theme: 'narrative-informational',
    body: `For nearly a century, a small crew of men lived on a jagged basalt island a mile off the Oregon coast and tended a single, stubborn light. Tillamook Rock Lighthouse, built in 1881, was famous for being unreachable — supplies arrived by a wire-and-pulley basket strung across the surf, and waves routinely broke over the lantern room, [Q1]which sat[/Q1] one hundred thirty-three feet above the sea.

The keepers were a quiet sort, and they had to be. Storms could trap them on the rock for weeks; in 1934, a single gale shattered every window in the building[Q2] flooded the kitchen,[/Q2] and dragged a thousand-pound boulder up onto the lantern deck. After that storm the keepers spent four days bailing water[Q3] cleaning[/Q3] saltwater from the lens, and re-glazing the windows before the lamp could be relit.

Despite the hardship, men volunteered for the post. The Coast Guard at the time considered Tillamook a desirable assignment[Q4]; it paid well,[/Q4] and the long off-shifts gave keepers six straight weeks of leave on the mainland. One keeper, James Christianson[Q5] served[/Q5] at the rock for twenty years and reportedly knew every gull on the island by name. [Q6]He kept a meticulous logbook, recording weather, ship sightings, and the temperament of the sea.[/Q6] [Q7]Although[/Q7] the work was lonely, he claimed in a 1948 interview that he had never been bored.

The lighthouse was decommissioned in 1957 and replaced by an automated buoy. [Q8]The building was sold, briefly, to a real-estate company.[/Q8] After several decades [Q9]of being disused[/Q9], the rock and its empty tower became a columbarium — a resting place for cremated remains[Q10] operated[/Q10] by a private foundation. Visitors are not permitted, but boats sometimes pass close enough that passengers can see the dark window-frames and the ghostly white walls.

[Q11]On the other hand,[/Q11] to historians and to the descendants of its keepers, Tillamook Rock is a reminder of an older relationship between people and the coast: [Q12]one, in which,[/Q12] a few stubborn humans lived [Q13]uncomfortably[/Q13] on a small piece of stone in order to keep a light burning for ships [Q14]who they would never see[/Q14].`
  },
  {
    id: 'p2',
    title: 'How a Single Mushroom Connected a Forest',
    theme: 'science-informational',
    body: `In 1992, a graduate student in Michigan named Myron Smith [Q16]discovered[/Q16] something extraordinary growing beneath the soil of a hardwood forest: a single fungus that covered roughly thirty-seven acres. The organism, Armillaria gallica, was not a cluster of separate mushrooms[Q17] but rather[/Q17] one connected genetic individual, knit together by underground threads called hyphae.

[Q18]Armillaria gallica had been hiding in plain sight for centuries.[/Q18] The mushrooms that occasionally pushed up through the leaf litter were just the visible fruiting bodies of a much larger network. Smith and his colleagues confirmed the organism's identity by sampling DNA from mushrooms across the forest, [Q19]finding[/Q19] that the genetic fingerprint was identical at every site. [Q20]The team published their findings in the journal Nature.[/Q20]

The discovery raised an obvious question[Q21]:[/Q21] how big can a single fungus get? In 2000, researchers in eastern Oregon answered it dramatically. They identified an Armillaria ostoyae individual covering nearly 2,400 acres of the Malheur National Forest, [Q22]an area larger than 1,600 football fields[/Q22]. By weight, that fungus is among the largest known organisms on Earth.

Most fungi do not grow that large, [Q23]however[/Q23] the conditions in these old-growth forests appear to favor longevity: cool temperatures, a steady supply of decaying wood, and few disturbances [Q24]which allows[/Q24] the same organism to spread for thousands of years. Scientists estimate the Oregon fungus is between 1,900 and 8,650 years old. [Q25]Such estimates rely on slow, careful measurement of the fungus's annual growth at the colony's edges.[/Q25]

Beyond their size, these fungi are quietly important to forest ecology. Their hyphal networks decompose dead wood, [Q26]release[/Q26] nutrients back into the soil, and even transmit chemical signals between trees. [Q27]Some researchers, however,[/Q27] have suggested the network functions almost like an ecological internet — though the metaphor [Q28]should not be taken too literally[/Q28].

Whatever the right comparison, the Michigan and Oregon discoveries [Q29]have reshaped[/Q29] how biologists think about individuality. A single organism, it turns out, can be quieter, older, and far larger [Q30]than[/Q30] anyone had imagined.`
  },
  {
    id: 'p3',
    title: 'The Surprising Math of Honeybee Hives',
    theme: 'science-informational',
    body: `Inside an active hive, honeybees build their wax cells in a pattern that has fascinated geometers for two thousand years. The cells are hexagons, not circles or squares, [Q31]and[/Q31] the choice is not accidental. Hexagons cover a flat surface without gaps and use less wax per unit of stored honey than any other regular shape.

[Q32]In the third century,[/Q32] the Greek mathematician Pappus of Alexandria first speculated that bees had solved a complex tiling problem. He noted that bees, [Q33]if they were trying to maximize storage with the minimum amount of wax,[/Q33] would inevitably arrive at the hexagonal grid. [Q34]However,[/Q34] his proof was incomplete, and the question remained formally open for almost 1,700 years.

A complete mathematical proof did not appear until 1999, when the American mathematician Thomas Hales [Q35]demonstrated[/Q35] that no other tiling could beat the hexagon for material efficiency. [Q36]Hales had earlier proven the famous Kepler conjecture about sphere packing,[/Q36] and his hexagonal honeycomb proof drew on similar techniques.

But there is a wrinkle. [Q37]The visible mouths of honeycomb cells are flat hexagons; the back of each cell is a three-faced rhombic pyramid that interlocks with cells on the opposite side of the comb.[/Q37] [Q38]These rhombic ends use slightly more wax than a perfect hexagonal tube would.[/Q38] Why would bees, evolved over millions of years to be efficient, [Q39]settle for[/Q39] a less-efficient design at the back of the cell?

[Q40]The answer appears to be structural.[/Q40] The rhombic geometry, while imperfect for storage, allows two layers of cells to nest tightly back-to-back, [Q41]doubling[/Q41] the comb's storage with no extra structural weight. In effect, bees have traded a small amount of wax efficiency for a large gain in [Q42]structural; integrity[/Q42].

[Q43]What honeybees seem to "know" — though of course they do not know it in any cognitive sense — is that the best engineering solution is rarely the one that optimizes a single variable.[/Q43] [Q44]Real-world structures must balance materials,[/Q44] [Q45]weight[/Q45], and load. The bees, it turns out, are excellent applied mathematicians.`
  },
  {
    id: 'p4',
    title: 'Why City Streets Were Once Filled With Snow',
    theme: 'history-informational',
    body: `Before automobiles dominated American cities, [Q46]winter streets were not plowed[/Q46]. They were rolled. Through the late nineteenth century, every northern city employed crews [Q47]who[/Q47], after each snowfall, would harness teams of horses to massive log-drum rollers and pack the snow into a smooth, hard surface.

The reason was simple[Q48]:[/Q48] sleighs and sleds traveled faster on packed snow than wagons did on bare cobblestones. Merchants in Boston[Q49], for example,[/Q49] looked forward to a heavy winter because frozen streets meant cheaper, faster delivery of goods from the harbor. Some downtown roads were even sprinkled with [Q50]additional[/Q50] snow when natural snowfall failed to coat the cobbles thoroughly.

This system [Q51]worked well, until[/Q51] automobiles arrived. Cars hated packed snow — their narrow tires sank into the soft top layer and spun helplessly, [Q52]something that horses, which spread their weight, never had a problem with[/Q52]. [Q53]Worse,[/Q53] automobile drivers wanted bare pavement to keep their tires gripping efficiently.

By the 1920s, public works departments faced an awkward conflict. [Q54]The new technology of the automobile demanded one strategy; the old technology of the sleigh demanded the opposite.[/Q54] [Q55]Cities chose the cars.[/Q55] Snow-rolling crews were disbanded, plows were purchased, and salt trucks soon followed.

[Q56]The shift had unexpected costs.[/Q56] Plowed streets were faster for cars but turned to slick ice once temperatures dropped, [Q57]requiring[/Q57] expensive de-icing chemicals that corroded both vehicles and infrastructure. [Q58]In addition,[/Q58] the salt washed into nearby streams every spring, killing fish and contaminating drinking water. Cities are still grappling with the [Q59]consequences[/Q59] a century later.

[Q60]Nowadays,[/Q60] some northern municipalities are experimenting with brining streets in advance of storms — a pre-treatment that uses far less salt overall. The idea is partly inspired by the old snow-rolling logic: anticipating the weather rather than reacting to it. The technology has changed, but the underlying problem of moving safely across frozen ground turns out to be older than any of the solutions to it.`
  },
  {
    id: 'p5',
    title: 'A Small Library That Outgrew Its Town',
    theme: 'narrative-informational',
    body: `The Stillwell Free Library opened in 1894 with a collection of 412 books, [Q61]most of which were donated[/Q61] by a single retired schoolteacher named Eleanor Stillwell. She had wanted, she wrote in her journal[Q62],[/Q62] "a place where any child could read whatever they wished, free of charge or judgment." For its first thirty years, the library served only the village of Stillwell, Vermont, [Q63]who's[/Q63] population never exceeded 800.

[Q64]However,[/Q64] in the 1950s the library began to acquire an unusual reputation. Visiting scholars discovered that Eleanor's modest brick building held one of the most complete regional collections of nineteenth-century New England diaries in the country, [Q65]including dozens of unpublished accounts from the abolition movement[/Q65]. The librarian at the time, [Q66]a careful woman named Margaret Polk,[/Q66] had spent decades tracking down attic boxes and barn trunks, persuading their owners to donate.

By 1970, the Stillwell library was lending materials to universities as far away as Texas. [Q67]Researchers wrote ahead, scheduled visits, and traveled hours to read papers that existed nowhere else.[/Q67] The collections grew steadily — donated, [Q68]not purchased[/Q68] — and the library's reputation outran the town's modest tax revenue.

[Q69]Then came the digital era.[/Q69] The trustees worried that scanning everything would be expensive but determined to do it anyway, [Q70]arguing[/Q70] that the value of the diaries was now national. They raised the funds through small donations from former visitors. By 2010, every page of the original collection [Q71]had been scanned[/Q71] and was searchable from a free public website.

[Q72]The library today still operates from Eleanor's original brick building,[/Q72] [Q73]building, with[/Q73] the same wide pine floorboards and the same tall, drafty windows. The town's population [Q74]has crept[/Q74] up to about 1,200, but the library's online users number in the millions.`
  }
];

export function getPassage(id) {
  return PASSAGES.find(p => p.id === id);
}

// Compute the passage marker number from a question id like 'p2q07' → 22.
export function markerNumberFor(questionId) {
  const m = /^p(\d+)q(\d+)$/.exec(questionId);
  if (!m) return null;
  const passageNum = parseInt(m[1], 10);
  const qNum = parseInt(m[2], 10);
  return (passageNum - 1) * 15 + qNum;
}

// Parse a passage body into an ordered list of segments:
//   { type: 'text', text }
//   { type: 'underline', n, text }
// The renderer uses this to highlight the underlined portions inline.
export function parsePassageBody(body) {
  const segments = [];
  const re = /\[Q(\d+)\]([\s\S]*?)\[\/Q\1\]/g;
  let lastIndex = 0;
  let match;
  while ((match = re.exec(body)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: body.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'underline', n: parseInt(match[1], 10), text: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < body.length) {
    segments.push({ type: 'text', text: body.slice(lastIndex) });
  }
  return segments;
}

// Convenience: return the underlined text for a particular question id, or null.
export function underlinedTextFor(questionId, passage) {
  const n = markerNumberFor(questionId);
  if (n == null || !passage) return null;
  const segs = parsePassageBody(passage.body);
  const seg = segs.find(s => s.type === 'underline' && s.n === n);
  return seg ? seg.text : null;
}

// Return the sentence that contains the marker for the question, with the
// underlined portion replaced by an inline UNDERLINED HTML span. Used by the
// question card so the student can read the exact sentence in context.
// Returns { html, plain } where html is a safe-built innerHTML string.
export function sentenceContextFor(questionId, passage) {
  const n = markerNumberFor(questionId);
  if (n == null || !passage) return null;
  const body = passage.body;
  const open = `[Q${n}]`;
  const close = `[/Q${n}]`;
  const start = body.indexOf(open);
  if (start === -1) return null;
  const innerStart = start + open.length;
  const end = body.indexOf(close, innerStart);
  if (end === -1) return null;
  const inner = body.slice(innerStart, end);

  // Walk left from `start` to the previous sentence boundary (.!? or \n\n).
  let left = start;
  while (left > 0) {
    const c = body[left - 1];
    if (c === '\n' && body[left - 2] === '\n') break;
    if ((c === '.' || c === '!' || c === '?') && /\s/.test(body[left] || '')) break;
    left--;
  }
  // Walk right from `end + close.length` to the next sentence boundary.
  let right = end + close.length;
  while (right < body.length) {
    const c = body[right];
    if (c === '\n' && body[right + 1] === '\n') break;
    if ((c === '.' || c === '!' || c === '?') && /\s|$/.test(body[right + 1] || ' ')) {
      right++; // include the terminator
      break;
    }
    right++;
  }

  // Build sentence with all OTHER markers stripped (their text kept in plain),
  // and our target marker rendered as an underlined span.
  const slice = body.slice(left, right);
  const escapeHtml = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Replace any [Qx]...[/Qx] (where x !== n) with just its inner text.
  const stripped = slice.replace(/\[Q(\d+)\]([\s\S]*?)\[\/Q\1\]/g, (m, num, txt) => {
    if (parseInt(num, 10) === n) return `OPEN_TOK${txt}SHUT_TOK`;
    return txt;
  });
  const html = escapeHtml(stripped)
    .split('OPEN_TOK').join('<span class="bg-yellow-300 underline decoration-2 decoration-yellow-700 px-1 rounded font-semibold">')
    .split('SHUT_TOK').join('</span>')
    .trim();
  const plain = stripped.split('OPEN_TOK').join('').split('SHUT_TOK').join('').trim();
  return { html, plain, inner };
}
