---
layout: home
title: An open location protocol
titleTemplate: about.placepin.org

hero:
  name: 'placepin<span class="pp-stop">.</span>org'
  text: Nine characters for any point on Earth.
  tagline: >-
    An open, offline-decodable location protocol. No lookup table, no account,
    no service to be cut off from. A code is arithmetic, and anyone can
    implement it.
  actions:
    - theme: brand
      text: Read the specification
      link: /spec/spec
    - theme: alt
      text: Join the beta
      link: https://forms.gle/RbxSy673MNBGybju5
    - theme: alt
      text: Open the app
      link: https://placepin.org

features:
  - title: An equal-area grid, computed live
    details: >-
      Three nested dive-downs, each splitting its parent box into 27,000 cells
      by a deterministic apportionment routine. No precompute step and no
      index: every encode and decode partitions on the fly, which is what lets
      a client work with no network at all.
    link: /spec/spec#_03-·-the-grid
    linkText: The grid, normatively

  - title: An alphabet that cannot spell
    details: >-
      Thirty characters, no vowels, no L. Blocks cannot form words, so no code
      lands on a school and becomes a screenshot. 0 and 1 are safe to include
      precisely because O, I and L are absent.
    link: /spec/spec#_02-·-alphabet
    linkText: Why these thirty

  - title: Every truncation is a real address
    details: >-
      Drop the leading blocks and what remains still decodes, first to the
      ≈840 m area, then to the ≈137 km region. A coarser code is a first-class
      address, not a degraded one.
    link: /spec/spec#_01-·-anatomy-of-a-code
    linkText: Anatomy of a code

  - title: Conformance is fixtures, not prose
    details: >-
      sin, cos and sqrt are not bit-identical across platforms, so the
      specification defines conformance by published test vectors instead of by
      its own text. Every implementation consumes the same file.
    link: https://github.com/placepin-org/placepin-spec/blob/main/vectors.json
    linkText: vectors.json

  - title: Open, because the alternative is a dependency
    details: >-
      A code decodes through the published algorithm, specification and
      vectors, with no central service and no map provider to favour. A
      location protocol one company controls is not infrastructure. It is a
      billing relationship.
    link: /why
    linkText: Why another protocol

  - title: Still 0.x, and 1.0 is the freeze
    details: >-
      Every version is a 0.x on purpose: nothing emitted before the freeze is a
      durable code. Beta and stress testing come first, and 1.0 lands with
      non-Latin scripts mapped one-to-one onto the existing thirty characters.
    link: /next
    linkText: The road to 1.0
---

## What this is

placepin turns a latitude and longitude into a nine-character address, and back again:

<PinCode code="PYY-ZT7-WMR" />

That code names a cell roughly five metres on a side: a doorway, a gate, a particular corner of a field. It is short enough to say down a phone, and computable in both directions with about three kilobytes of code and no network.

The alternatives each give up something specific. [Why another protocol](/why) makes that case in full, including the parts that do not favour placepin.

## The one thing that surprises everyone

A code is written **finest to coarsest**, left to right. The most specific block comes first, because that is the part a person is actually told. Nobody knows which of 27,000 global regions they are standing in, but "the gate at `PYY`" is a thing someone can say to you.

The cost is that truncation runs **right to left**, backwards from every prefix system you have met:

<TruncationLadder />

That last rung is the trap. `PYY` on its own is not a coarse address and not an error. It is one of 27,000 local values *relative to whichever area cell it is paired with*, meaning something different inside each of roughly 729 million area-and-region combinations. §01 makes it normative that software must never decode three characters as a local block in isolation.

The same rule kills prefix indexes. Two codes sharing a leading block are usually continents apart, so **string similarity implies nothing** except a genuine right-anchored suffix match.

## There is no check character

A deliberate omission, not an oversight, and the consequence is worth stating plainly: **every corrupted code is still a valid address, somewhere.** A typo does not produce an error. It produces a different, real place, possibly on another continent.

The specification's position is that the fix belongs in the product, not the format. Anything built on placepin should preview the cell on a map and have a person confirm it before that location is acted on. A code should never be routed straight to a navigation handoff.

## Where the draft stands

Protocol **v5** is a draft, and [§10](/spec/spec#_10-·-versioning-prior-art-open-questions) is direct about what that means: nothing emitted before v5-final is a durable code. The grid, the apportionment rule, the boundary ownership and the normalization are all resolved. What is not resolved is human: whether the letter `Y` survives transcription trials, whether the confusable pairs hold up when a code is spoken or handwritten, and whether writing the spot first is genuinely easier to use.

Settling those is what the beta is for. [What's next](/next) lays out the road to the freeze, including what a 1.0 has to carry: **codes in non-Latin scripts**, mapped one-to-one onto the existing thirty characters so a script code is the same address rather than a related one, and a move off one person's repositories to [an open-source organisation](/next#an-open-source-organisation).

## The source

Three repositories, and the split between them is the point: the protocol, an implementation of it, and the fixtures that decide whether the second got the first right.

<SourceLinks />

For anything that is not a bug report or a specification proposal, such as governance, an implementation in another language, a script mapping, or building on this: **[hello@placepin.org](mailto:hello@placepin.org)**.

<BetaCta />
