// =====================================================
//  手にビじゃん Service Worker
//  バージョンを上げると古いキャッシュが自動削除されます
// =====================================================
const CACHE_NAME = 'tenibijan-v1';

const BASE = 'https://raw.githubusercontent.com/tenibi/tenibijan/main/';

// ── プリキャッシュ対象ファイル一覧 ──────────────────
const PRECACHE_URLS = [

  // ▼ 牌画像
  BASE + 'hai/manzu1.png',
  BASE + 'hai/manzu9.png',
  BASE + 'hai/pinzu1.png',
  BASE + 'hai/pinzu2.png',
  BASE + 'hai/pinzu3.png',
  BASE + 'hai/pinzu4.png',
  BASE + 'hai/pinzu5.png',
  BASE + 'hai/pinzu5aka.png',
  BASE + 'hai/pinzu6.png',
  BASE + 'hai/pinzu7.png',
  BASE + 'hai/pinzu8.png',
  BASE + 'hai/pinzu9.png',
  BASE + 'hai/souzu1.png',
  BASE + 'hai/souzu2.png',
  BASE + 'hai/souzu3.png',
  BASE + 'hai/souzu4.png',
  BASE + 'hai/souzu5.png',
  BASE + 'hai/souzu5aka.png',
  BASE + 'hai/souzu6.png',
  BASE + 'hai/souzu7.png',
  BASE + 'hai/souzu8.png',
  BASE + 'hai/souzu9.png',
  BASE + 'hai/zihai1.png',
  BASE + 'hai/zihai2.png',
  BASE + 'hai/zihai3.png',
  BASE + 'hai/zihai4.png',
  BASE + 'hai/zihai5.png',
  BASE + 'hai/zihai6.png',

  // ▼ 手スキン動画
  BASE + 'hand/tete.webm',
  BASE + 'hand/tete2.webm',
  BASE + 'hand/hyou.webm',
  BASE + 'hand/nekonote.webm',
  BASE + 'hand/siroinekonote.webm',
  BASE + 'hand/tenibinote.webm',
  BASE + 'hand/tora.webm',
  BASE + 'hand/irezumi01ao.webm',
  BASE + 'hand/irezumi01kiiro.webm',
  BASE + 'hand/irezumi01kuro.webm',
  BASE + 'hand/irezumi01pink.webm',

  // ▼ 指輪動画
  BASE + 'ring/yubiwa01.webm',
  BASE + 'ring/yubiwa01b.webm',
  BASE + 'ring/yubiwa01g.webm',
  BASE + 'ring/yubiwa01p.webm',
  BASE + 'ring/yubiwa02.webm',
  BASE + 'ring/yubiwa02b.webm',
  BASE + 'ring/yubiwa02g.webm',
  BASE + 'ring/yubiwa02p.webm',
  BASE + 'ring/yubiwa03.webm',
  BASE + 'ring/yubiwa03b.webm',
  BASE + 'ring/yubiwa03g.webm',
  BASE + 'ring/yubiwa03p.webm',
  BASE + 'ring/yubiwa04.webm',
  BASE + 'ring/yubiwa04b.webm',
  BASE + 'ring/yubiwa04g.webm',
  BASE + 'ring/yubiwa04p.webm',

  // ▼ 役満演出動画
  BASE + 'yakuman/kokusimusou.mp4',
  BASE + 'yakuman/renhou.mp4',
  BASE + 'yakuman/ryu.mp4',
  BASE + 'yakuman/tenhou.mp4',
  BASE + 'yakuman/tiihou.mp4',
  BASE + 'yakuman/tinroutou.mp4',
  BASE + 'yakuman/tuiso.mp4',
  BASE + 'yakuman/wanankou.mp4',
  BASE + 'yakuman/wanankoutanki.mp4',
  BASE + 'yakuman/wankantuu.mp4',

  // ▼ あがり演出動画
  BASE + 'agari/agari01.webm',
  BASE + 'agari/agari02.webm',
  BASE + 'agari/agari03.webm',
  BASE + 'agari/agari04.webm',

  // ▼ BGM
  BASE + 'BGM/' + encodeURIComponent('シンキング') + '.mp3',
  BASE + 'BGM/' + encodeURIComponent('ファーストステップ') + '.mp3',
  BASE + 'BGM/' + encodeURIComponent('思考のパズル') + '.mp3',
  BASE + 'BGM/' + encodeURIComponent('秋月の夜') + '.mp3',
  BASE + 'BGM/yourself.mp3',

  // ▼ SE（引く・捨てる 各5種）
  BASE + 'SE/hiku1.mp3',
  BASE + 'SE/hiku2.mp3',
  BASE + 'SE/hiku3.mp3',
  BASE + 'SE/hiku4.mp3',
  BASE + 'SE/hiku5.mp3',
  BASE + 'SE/sute1.mp3',
  BASE + 'SE/sute2.mp3',
  BASE + 'SE/sute3.mp3',
  BASE + 'SE/sute4.mp3',
  BASE + 'SE/sute5.mp3',

  // ▼ ボイス（ポン・カン・リーチ・ロン・ツモ 各7種）
  BASE + 'vc/pon01.mp3',  BASE + 'vc/pon02.mp3',  BASE + 'vc/pon03.mp3',
  BASE + 'vc/pon04.mp3',  BASE + 'vc/pon05.mp3',  BASE + 'vc/pon06.mp3',
  BASE + 'vc/pon07.mp3',
  BASE + 'vc/kan01.mp3',  BASE + 'vc/kan02.mp3',  BASE + 'vc/kan03.mp3',
  BASE + 'vc/kan04.mp3',  BASE + 'vc/kan05.mp3',  BASE + 'vc/kan06.mp3',
  BASE + 'vc/kan07.mp3',
  BASE + 'vc/riti01.mp3', BASE + 'vc/riti02.mp3', BASE + 'vc/riti03.mp3',
  BASE + 'vc/riti04.mp3', BASE + 'vc/riti05.mp3', BASE + 'vc/riti06.mp3',
  BASE + 'vc/riti07.mp3',
  BASE + 'vc/ron01.mp3',  BASE + 'vc/ron02.mp3',  BASE + 'vc/ron03.mp3',
  BASE + 'vc/ron04.mp3',  BASE + 'vc/ron05.mp3',  BASE + 'vc/ron06.mp3',
  BASE + 'vc/ron07.mp3',
  BASE + 'vc/tumo01.mp3', BASE + 'vc/tumo02.mp3', BASE + 'vc/tumo03.mp3',
  BASE + 'vc/tumo04.mp3', BASE + 'vc/tumo05.mp3', BASE + 'vc/tumo06.mp3',
  BASE + 'vc/tumo07.mp3',

  // ▼ ガチャ・キャラ画像
  BASE + 'gacha/C00.png',
  BASE + 'gacha/C01.png',
  BASE + 'gacha/C02.png',
  BASE + 'gacha/C03.png',
  BASE + 'gacha/C04.png',
  BASE + 'gacha/C05.png',
  BASE + 'gacha/C06.png',
  BASE + 'gacha/C07.png',
  BASE + 'gacha/C08.png',
  BASE + 'gacha/L01.png',
  BASE + 'gacha/L02.png',
  BASE + 'gacha/L03.png',
  BASE + 'gacha/L04.png',
  BASE + 'gacha/L05.png',
  BASE + 'gacha/L06.png',
  BASE + 'gacha/L07.png',
  BASE + 'gacha/L08.png',
  BASE + 'gacha/L09.png',
  BASE + 'gacha/R05.png',

  // ▼ 指輪アイコン
  BASE + 'ringicon/ring01.png',  BASE + 'ringicon/ring01b.png',
  BASE + 'ringicon/ring01g.png', BASE + 'ringicon/ring01p.png',
  BASE + 'ringicon/ring02.png',  BASE + 'ringicon/ring02b.png',
  BASE + 'ringicon/ring02g.png', BASE + 'ringicon/ring02p.png',
  BASE + 'ringicon/ring03.png',  BASE + 'ringicon/ring03b.png',
  BASE + 'ringicon/ring03g.png', BASE + 'ringicon/ring03p.png',
  BASE + 'ringicon/ring04.png',  BASE + 'ringicon/ring04b.png',
  BASE + 'ringicon/ring04g.png', BASE + 'ringicon/ring04p.png',

  // ▼ 手のスキンアイコン
  BASE + 'tenoicon/defote.png',
  BASE + 'tenoicon/hyou.png',
  BASE + 'tenoicon/neko.png',
  BASE + 'tenoicon/sironeko.png',
  BASE + 'tenoicon/ao01.png',
  BASE + 'tenoicon/kiiro01.png',
  BASE + 'tenoicon/kuro01.png',
  BASE + 'tenoicon/pink01.png',
  BASE + 'tenoicon/tora.png',
  BASE + 'tenoicon/kuma.png',

  // ▼ 称号画像
  BASE + 'syougou/bakuhatu.png',
  BASE + 'syougou/hakaisin.png',
  BASE + 'syougou/hebi.png',
  BASE + 'syougou/inu.png',
  BASE + 'syougou/kita4.png',
  BASE + 'syougou/kitune.png',
  BASE + 'syougou/kokusi.png',
  BASE + 'syougou/neko.png',
  BASE + 'syougou/nezumi.png',
  BASE + 'syougou/renhou.png',
  BASE + 'syougou/ryuiso.png',
  BASE + 'syougou/saru.png',
  BASE + 'syougou/tenhou.png',
  BASE + 'syougou/tiihou.png',
  BASE + 'syougou/tinroutou.png',
  BASE + 'syougou/tuiso.png',
  BASE + 'syougou/uma.png',
  BASE + 'syougou/usi.png',
  BASE + 'syougou/wananko.png',
  BASE + 'syougou/wanankoutanki.png',
  BASE + 'syougou/wankantu.png',
  BASE + 'syougou/zou.png',

  // ▼ テーブルボタン画像
  BASE + 'tbotan/bomu.png',
  BASE + 'tbotan/cpu.png',
  BASE + 'tbotan/gacha.png',
  BASE + 'tbotan/purofi.png',
  BASE + 'tbotan/rankuma.png',
  BASE + 'tbotan/rumuma.png',
  BASE + 'tbotan/shop.png',

  // ▼ マット・背景
  BASE + 'mat/mat00.png',
  BASE + 'mat/mat01.png',
  BASE + 'haikei/hai01.webp',
  BASE + 'haikei/hai02.webp',
  BASE + 'haikei/hai03.webp',
  BASE + 'haikei/hai04.webp',
  BASE + 'taisenhaikei.webp',

  // ▼ コイン・ロゴ・その他
  BASE + 'coin/tenibi.png',
  BASE + 'coin/tbb.png',
  BASE + 'fabi.png',
  BASE + 'logo.png',
  BASE + 'ware/ware.png',
  BASE + 'ware/warese.mp3',
];

// =====================================================
//  インストール: 全ファイルをまとめてキャッシュ
// =====================================================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 1件失敗しても他は続ける（存在しないファイルがあっても止まらない）
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] キャッシュ失敗:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// =====================================================
//  アクティベート: 古いキャッシュを削除
// =====================================================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] 古いキャッシュ削除:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// =====================================================
//  フェッチ: キャッシュ優先、なければ取得してキャッシュ
// =====================================================
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // raw.githubusercontent.com と github.com?raw=true のみ対象
  const isAsset =
    url.includes('raw.githubusercontent.com/tenibi/tenibijan') ||
    (url.includes('github.com/tenibi/tenibijan') && url.includes('raw=true'));

  if (!isAsset) return; // 関係ないリクエストはスルー

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached; // ✅ キャッシュヒット！
      }

      // キャッシュにない場合はネットワークから取得してキャッシュに追加
      return fetch(event.request).then(response => {
        if (!response || !response.ok || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // オフラインで取得不可の場合はそのまま失敗させる
      });
    })
  );
});
