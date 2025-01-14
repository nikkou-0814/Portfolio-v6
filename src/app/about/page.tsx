'use client';
import Header from '../components/Header';

export default function About() {
  return (
    <main className="min-h-screen mt-16">
      <Header />
      <section className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h1>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-400 leading-relaxed max-w-2xl">
          <div className="space-y-4">
            <p>
              こんにちは！私はWebデザインやアプリケーション開発を行っている日本の学生です。
              最近では地震や防災に興味を持っています。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              プログラミングの始まり
            </h3>
            <p>
              小学4年生の頃、
              <a
                href="https://scratch.mit.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                Scratch
              </a>
              というプログラミング学習サイトでゲームやアプリを制作する中で、プログラミングの基本を学びました。
              地震関連の開発も、この経験が基礎となっています。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              Webデザインの挑戦
            </h3>
            <p>
              プログラミングに興味を持ち、HTMLでWebサイトを制作し始めました。
              初めはデザインが上手くいきませんでしたが、他のサイトを参考にして少しずつスキルを磨いてきました。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              地震との出会い
            </h3>
            <p>
              能登半島地震がきっかけで地震に強い関心を持つようになりました。その日は母の実家で夕食を準備している最中でした。突然、家が激しく揺れ、エリアメールが鳴り響きました。
            </p>
            <p>
              緊急地震速報ソフト
              <a
                href="https://jquake.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                JQuake
              </a>
              を起動すると、「最大震度7」と表示されていました。この経験が地震観測への興味を大きく広げてくれました。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
              地震情報ツールの開発
            </h3>
            <p>
              最初に作った地震関連ツールは「EarthSaidBOT」でした。仕様や設計が未熟だったため課題も多かったですが、経験を積むことで改善してきました。
            </p>
            <p>
              現在は複数の情報源を利用して中継サーバーを運用し、精度と安定性の向上に努めています。これにより、地震情報を迅速かつ確実に取得できるようになりました。
            </p>
            <p className="text-sm text-gray-500">
              ※
              <a
                href="https://dmdata.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 underline"
              >
                DM-D.S.S
              </a>
              の規約に従い、個人利用の範囲内で運用しています。
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg italic">
            <p>あの地震が、私の地震に対する思いを大きく変えました。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
