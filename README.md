# @Hack 2026: First Contact

> Authored by [Oleksiy](https://github.com/asquik).

- **Category**: `Web`
- **Solves**: `flag1: 55/120, flag2: 92/120`
- **Tags**: `beginner`
- **Protocol**: `http`

> ### First Contact
>
> Recently, our deep space monitoring system detected that we are being watched by an unknown alien civilization. We
> found what appears to be their surveillance dashboard. Your task is to explore this interface and see if you can
> retrieve anything of value.
>
> #### Part 1/2
>
> The page itself doesn't seem much interactive. See if you can find ways to access more data than visible on the
> page
>
> #### Part 2/2
>
> Can you figure out how the data is accessed by this page?
>

## Access a dockerized instance

Run challenge container using docker compose

```
docker compose up -d
```

Open below URL on your browser

```
http://localhost:53007/
```

<details>
<summary>
How to stop/restart challenge?
</summary>

To stop the challenge run

```
docker compose stop
```

To restart the challenge run

```
docker compose restart
```

</details>

## Reveal Flag(s)

Did you try solving this challenge?
<details>
<summary>
Yes
</summary>

Did you **REALLY** try solving this challenge?

<details>
<summary>
Yes, I promise!
</summary>

- Flag 1: `ATHACKCTF{h1dd3n_d3v_p4g3s_l34k_s3cr3ts}`
- Flag 2: `ATHACKCTF{cl13nt_s1d3_st0r4g3_1s_n3v3r_s3cur3}`

</details>
</details>


---

## About @Hack

[@Hack](https://athackctf.com/) is an annual CTF (Capture The Flag) competition hosted
by [HEXPLOIT ALLIANCE](https://hexploit-alliance.com/) and [TECHNATION](https://technationcanada.ca/) at Concordia
University in Montreal, Canada.

---
[Check more challenges from @Hack 2026](https://github.com/athack-ctf/AtHackCTF-2026-Challenges).
