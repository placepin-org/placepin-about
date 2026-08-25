---
title: Why placepin
description: What already exists, what each system gives up, and what placepin claims in return.
outline: [2, 3]
---

# Why another protocol

There are already open location codes, and one of them ships inside Google Maps. Adding another needs a better reason than enthusiasm, so here is the argument in full, including the parts that do not favour placepin.

## The problem: a place with no address

Street addressing is not universal, and where it exists it is often not precise enough to be useful. A gate is not a building. A trailhead is not a road. A stall is not a market. A delivery entrance around the back is not the number on the front. Hundreds of millions of people live somewhere a courier cannot find from an address alone, and everybody else has regularly had to say *"meet me at the corner past the second gate"* to somebody standing two hundred metres away.

Coordinates solve the precision problem completely and the human problem not at all. `51.507387, -0.127806` is exact, unambiguous, universally decodable, and nobody has ever read one down a phone line without repeating it.

So the requirement is narrow and awkward: something as precise as a coordinate that a person can **say**, **hear**, **write down**, and **type on a phone keyboard** without a mistake going unnoticed.

## What already exists

Each of these is a real, working system built by people who thought hard about it. Each also gives something up.

| System | Length | Truncation | Word risk | Status |
|---|---|---|---|---|
| **placepin v5** | 9 | Yes: 3/6/9 all valid, from the coarse (right-hand) end | None (no vowels) | Draft |
| Plus Codes (OLC) | 10–11 | Partial (padding form) | None | Open, shipped in Google Maps |
| what3words | 3 words | No | Inherent | Closed, commercial |
| Geohash | 6–12 | Yes (prefix) | Yes (vowels present) | Open, de facto |

### Latitude and longitude

Precise, open, and the thing every other system decodes *to*. Also unsayable, unmemorable, and impossible to check by eye. It is the baseline, not a competitor.

### Plus Codes

The closest relative, and the one to beat honestly. Open, well-specified, integer arithmetic, no word risk, and already in the world's most-used mapping app, which is a real advantage placepin does not have and should not pretend to.

Where placepin differs is the **spoken form**. At comparable precision a Plus Code runs ten or eleven characters; a placepin code is nine, in a fixed 3–3–3 rhythm that is easier to dictate and to hear back. And truncation in OLC works through a padding form rather than every shortened code simply being a valid coarser address.

### what3words

The most memorable of all of them: three ordinary words genuinely beat nine characters for recall, and it would be dishonest to claim otherwise. The costs are structural rather than cosmetic:

- **It is proprietary.** The word lists and the algorithm are owned. Decoding requires permission, which makes it a dependency rather than a protocol.
- **There is no hierarchy.** Three words name a square and nothing else; there is no coarser form, no containment, nothing to shorten.
- **Word risk is inherent** to using words. Near-misses between similar addresses land somewhere else, and the failure is invisible.

### Geohash

Open, widely deployed, elegantly prefix-truncating, and excellent as a database key. Its alphabet contains vowels, so its codes can and do spell things, which becomes a real problem the moment a code is something a person sees rather than something a database stores. Lengths also vary, so there is no fixed rhythm to speak.

## What placepin claims

Four things, and no more than four:

- **A shorter spoken form** than Plus Codes at comparable precision: nine characters against ten or eleven.
- **A uniform 3–3–3 rhythm**, where every truncation is a first-class address rather than a special form. <PinCode code="ZT7-WMR" compact /> and <PinCode code="WMR" compact /> are ordinary codes, not degraded ones.
- **A local-first write order**, so the block a person is actually told comes first. That is what makes proximity-aware input possible: a search box can accept the part somebody knows and use a rough sense of where they are to find the rest.
- **Near-equal-area cells**, from a recursive latitude-adaptive partition rather than a projection that stretches toward the poles.

And underneath all four, the thing that is not a feature so much as a precondition: **a code is arithmetic**. There is no lookup table, no index, and no service. `decode()` is about three kilobytes and works on a phone with no signal, which is exactly the situation in which somebody most needs to say where they are.

## The honest costs

A protocol that only lists its advantages is marketing. These are in [§10](/spec/spec#_10-·-versioning-prior-art-open-questions) of the specification, not buried in a FAQ:

- **No error detection.** There is no check character, so **every corrupted code is a valid address somewhere**. A typo does not error. It points at a different real place, possibly on another continent. The mitigation is a product one: preview the cell and confirm it before acting on it, never hand a typed code straight to navigation.
- **A floating-point conformance burden.** `sin`, `cos` and `sqrt` are not bit-identical across platforms, so conformance is defined by published vectors rather than by the prose. An exact-integer respec is the long-term fix and has not been done.
- **An unfamiliar truncation direction.** Dropping from the right is what Geohash and Plus Codes taught everyone. placepin drops from the left, and that has to be learned.
- **Adoption from zero.** Plus Codes are in Google Maps. placepin is in a beta.

If those trade-offs are wrong for what you are building, one of the systems above is the better answer, and the specification says so in its own words.

## Why it has to be open

A location protocol that one company controls is not infrastructure. It is a dependency with a billing relationship. The whole value of *"this is where I am"* is that it keeps working: offline, in ten years, in software nobody has written yet, without asking anyone.

So the specification is CC BY 4.0, the reference implementation is Apache-2.0, and the conformance fixtures are published as their own artifact so no implementation gets to mark its own exam paper. The protocol's identity has to survive the domain name: fork it, mirror it, implement it in any language. The one thing nobody should do is quietly change what a code means.

That is also why moving governance off a single person's account is on the [roadmap](/next#an-open-source-organisation) rather than filed under "someday".

<BetaCta />
