
import prisma from "@database";

class CalcadosRepositorie
{
    async BuscarPorTamanho(tamanho: number)
    {
        return await prisma.calcado.findMany(
        {
            where:
            {
                tamanho: tamanho
            }
        });
  
    }

    async BuscarPorMarca(marca: string)
    {
        return await prisma.calcado.findMany(
        {
            where:
            {
                marca:
                {
                    contains: marca,
                    mode: 'insensitive' // Ignora maiúsculas/minúsculas
                }
            }
        });
    }

    async ContarEstoque()
    {
        const todos = await prisma.calcado.findMany();
        let total = 0;

        todos.forEach(item => {
        total += item.quantidade_em_estoque;
        });

        return total;
    }

    async compra(id: number) //criei essa função extra porque achei que seria legal que tivesse uma que reduzisse 1 do estoque, pra simular uma "compra"
    {
  
        const calcado = await prisma.calcado.findUnique(
        {
            where: { id: id }
        });

    
        if (!calcado || calcado.quantidade_em_estoque <= 0) {
            return null;
        }

        
        return await prisma.calcado.update(
        {
            where: { id: id },
            data:
            {
                quantidade_em_estoque: calcado.quantidade_em_estoque - 1
            }
        });
    }
}

export default new CalcadosRepositorie();